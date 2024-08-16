import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

export class PokemonPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(pokemonName: string) {
        await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async getArtistText(): Promise<string | null> {
        return this.page.locator('td.infobox-image .infobox-caption a').innerText();
    }

    async downloadAndSaveImage(imageUrl: string, savePath: string) {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(imageUrl); 
        if (!response.ok) {
            throw new Error(`Error al descargar la imagen: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Asegurarse de que el directorio existe
        const directory = path.dirname(savePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // Guardar la imagen
        fs.writeFileSync(savePath, buffer);
    }
}