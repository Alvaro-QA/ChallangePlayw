import { test, expect, APIRequestContext } from '@playwright/test';
import { hashSecretKey, readTestData, PokemonData } from '../../config/utils';
import { BASE_URL } from '../../config/environments';

const testDataPromise = readTestData('tests/data/pokemon_data.xlsx');
const TIME_LIMIT = 10000; // 10 segundos en milisegundos

// Test suite para la validación de Pokémon
test.describe('Validación de Pokémon', () => {

    
    // Test para validación por ID
    test('Validar Pokémon por ID', async ({ request }) => {
        await runValidationTests(request, 'ID');
    });



    // Test para validación por Nombre
    test('Validar Pokémon por Nombre', async ({ request }) => {
        await runValidationTests(request, 'Nombre');
    });
});

// Función auxiliar para ejecutar pruebas
async function validatePokemon(request: APIRequestContext, data: PokemonData, key: string, keyType: 'ID' | 'Nombre') {
    console.log(`Clave secreta encriptada: ${hashSecretKey}`);

    const startTime = new Date();

    try {
        const response = await request.get(`${BASE_URL}/pokemon/${key}`);
        const responseBody = await response.json();

        console.log(`Estado de la respuesta: ${response.status()}`);
        // Validaciones
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(data.id);
        expect(responseBody.name).toBe(data.name);

        const expectedAbilities = data.abilities.split(',').map((ability: string) => ability.trim());
        const actualAbilities = responseBody.abilities.map((ability: { ability: { name: string } }) => ability.ability.name);
        expect(actualAbilities.sort()).toEqual(expectedAbilities.sort());

        const endTime = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();
        console.log(`Tiempo de respuesta ${keyType}: ${responseTime} ms`);
        expect(responseTime).toBeLessThan(TIME_LIMIT);
    } catch (error) {
        console.error(`Error en el test para ${keyType}: ${key}`, error);
        throw error;
    }
}

// Función común para ejecutar tests de validación
async function runValidationTests(request: APIRequestContext, keyType: 'ID' | 'Nombre') {
    const testData = await testDataPromise;

    for (const [index, data] of testData.entries()) {
        if (!data.name || !data.abilities || (keyType === 'ID' && !data.id)) {
            throw new Error(`Datos inválidos en la fila ${index + 1}`);
        }

        const key = keyType === 'ID' ? data.id.toString() : data.name;
        await validatePokemon(request, data, key, keyType);
    }
}

