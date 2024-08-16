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
    console.log(`Validando Pokémon ${keyType}: ${key}`);

    const startTime = new Date();

    try {
        const response = await request.get(`${BASE_URL}/pokemon/${key}`);
        const responseBody = await response.json();

        // Validaciones
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(data.id);
        expect(responseBody.name).toBe(data.name);

        const expectedAbilities = data.abilities.split(',').map((ability: string) => ability.trim());
        const actualAbilities = responseBody.abilities.map((ability: { ability: { name: string } }) => ability.ability.name);
        expect(actualAbilities.sort()).toEqual(expectedAbilities.sort());

        const endTime = new Date();
        const responseTime = endTime.getTime() - startTime.getTime();

        return responseTime; // Retorna el tiempo de respuesta para acumular
    } catch (error) {
        console.error(`Error en el test para ${keyType}: ${key}`, error);
        throw error;
    }
}

// Función común para ejecutar tests de validación
async function runValidationTests(request: APIRequestContext, keyType: 'ID' | 'Nombre') {
    const testData = await testDataPromise;

    let totalResponseTime = 0; // Variable para acumular el tiempo total de respuesta

    for (const [index, data] of testData.entries()) {
        if (!data.name || !data.abilities || (keyType === 'ID' && !data.id)) {
            throw new Error(`Datos inválidos en la fila ${index + 1}`);
        }

        const key = keyType === 'ID' ? data.id.toString() : data.name;
        const responseTime = await validatePokemon(request, data, key, keyType);
        totalResponseTime += responseTime; // Acumula el tiempo de respuesta
    }

    const endDate = new Date();
    console.log(`Tiempo total de respuesta para prueba por ${keyType}: ${totalResponseTime} ms`);
    console.log(`Fecha y hora de finalización del test: ${endDate.toISOString()}`);

    expect(totalResponseTime).toBeLessThan(TIME_LIMIT); // Verifica el tiempo total
}
