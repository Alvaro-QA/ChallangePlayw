import { test, expect, Page } from '@playwright/test';
import { PokemonPage } from '../../pages/PokemonPage';  
import { hashSecretKey, readTestData } from '../../config/utils';  

const testDataFilePath = 'tests/data/pokemon_data.xlsx';

// Función para obtener un nombre de archivo único para cada imagen
const getImageFileName = (pokemonName: string): string => {
    return `${pokemonName.toLowerCase()}.png`;
};

// Definir el tipo de los datos de prueba
interface PokemonData {
    name: string;
}

test.describe('Pruebas de Wikipedia para Pokémon', () => {
    let testData: PokemonData[];

    test.beforeEach(async ({ page }) => {
        // Leer los datos de prueba desde el archivo Excel, si no se ha hecho ya
        if (!testData) {
            testData = await readTestData(testDataFilePath);
        }
        // Maximizar la ventana del navegador
        await page.setViewportSize({ width: 1920, height: 1080 });
    });

    // Crear un test independiente para cada Pokémon
    test('Validar Pokémon 1 en Wikipedia', async ({ page }) => {
        await validatePokemon(page, testData[0]);
    });

    test('Validar Pokémon 2 en Wikipedia', async ({ page }) => {
        await validatePokemon(page, testData[1]);
    });

    test('Validar Pokémon 3 en Wikipedia', async ({ page }) => {
        await validatePokemon(page, testData[2]);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

// Función auxiliar para validar un Pokémon
const validatePokemon = async (page: Page, data: PokemonData) => {
    const { name } = data;
    if (!name) return;

    const pokemonPage = new PokemonPage(page);

    // Loguear la clave secreta encriptada antes de cada prueba
    console.log(`Clave secreta encriptada: ${hashSecretKey}`);

    // Navegar a la página del Pokémon
    await pokemonPage.navigateTo(name);

    // Validar el título de la página
    const title = await pokemonPage.getPageTitle();
    expect(title.toLowerCase()).toContain(name.toLowerCase());

    // Loguear quién realizó el dibujo
    const artistText = await pokemonPage.getArtistText();
    console.log(`Dibujo realizado por: ${artistText}`);

    // Obtener la URL de la imagen del Pokémon desde el DOM
    const imageUrl = await page.locator('td.infobox-image img.mw-file-element').getAttribute('src');
    const absoluteImageUrl = imageUrl ? `https:${imageUrl}` : '';

    if (absoluteImageUrl) {
        // Descargar y guardar la imagen
        const imageName = getImageFileName(name);
        await pokemonPage.downloadAndSaveImage(absoluteImageUrl, imageName);
    } else {
        throw new Error('No se encontró la URL de la imagen.');
    }
    
};
