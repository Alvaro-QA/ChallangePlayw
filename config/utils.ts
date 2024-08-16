import { createHash } from 'crypto';
import * as XLSX from 'xlsx';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

// Obtener la clave secreta desde las variables de entorno
export const secretKey = process.env.SECRET_KEY || '';
export const hashSecretKey = createHash('sha256').update(secretKey).digest('hex');

// Definición de la interfaz para los datos de Pokémon
export interface PokemonData {
    id: number;
    name: string;
    abilities: string;
}

// Función para leer los datos desde el archivo Excel
export async function readTestData(filePath: string): Promise<PokemonData[]> {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json<PokemonData>(worksheet);

    return sheetData;
}

// Función para crear una carpeta si no existe
export function ensureDirectoryExists(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

// Función para descargar una imagen y guardarla en una carpeta
export async function downloadImage(imageUrl: string, savePath: string) {
    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Error al descargar la imagen: ${response.statusText}`);
        }

        const buffer = await response.buffer();

        // Asegurarse de que el directorio existe
        const directory = path.dirname(savePath);
        ensureDirectoryExists(directory);

        // Guardar la imagen usando fs
        fs.writeFileSync(savePath, buffer);
    } catch (error) {
        console.error(`Error al descargar o guardar la imagen: ${(error as Error).message}`);
        throw new Error(`No se pudo guardar la imagen desde ${imageUrl}`);
    }
}

// Función para validar la extensión y el tamaño del archivo de imagen
export function validateImageFile(filePath: string) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
    const extname = path.extname(filePath).toLowerCase();
    const fileSize = fs.statSync(filePath).size;

    if (!validExtensions.includes(extname)) {
        throw new Error('La extensión del archivo no es válida');
    }

    if (fileSize > 500000) {
        throw new Error('El tamaño del archivo supera los 500000 bytes');
    }
}
