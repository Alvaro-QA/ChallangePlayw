# Proyecto de Pruebas Automatizadas con Playwright

Este proyecto está diseñado para realizar pruebas automatizadas en la API de Pokémon utilizando Playwright. A continuación se detallan los pasos necesarios para configurar el entorno, ejecutar las pruebas y visualizar los resultados en un reporte.

## Requisitos

- **Node.js**: Se recomienda la versión 14 o superior. Puedes descargar e instalar Node.js desde [nodejs.org](https://nodejs.org/).

## Configuración del entorno

1. Clona este repositorio en tu máquina local:

     git clone https://github.com/tu-usuario/tu-repositorio.git


2. Navega al directorio del proyecto:

     cd tu-repositorio

3. Instala las dependencias del proyecto:
     
     npm install
     
## Librerías Adicionales

Estas son las librerías adicionales utilizadas en el proyecto:

- **`dotenv`**: Carga variables de entorno desde el archivo `.env`.
- **`xlsx`**: Lee archivos Excel.
- **`node-fetch`**: Descarga imágenes desde URLs.

### Instalación de Librerías

Para instalar estas librerías, ejecuta:

```bash
npm install dotenv xlsx node-fetch   
```

## POM

Este proyecto usa el Page Object Model (POM) para organizar las pruebas. POM ayuda a separar la lógica de prueba de la interacción con la interfaz de usuario.

pages/: Contiene clases que representan páginas y encapsulan la lógica de interacción con ellas.

## Archivo `utils.ts`

Proporciona varias utilidades para la configuración, manejo de datos, y archivos dentro del proyecto. A continuación se detalla cada función y componente:

- **`dotenv.config();`**: Carga variables de entorno desde el archivo `.env`.

- **`secretKey`**: Obtiene la clave secreta de las variables de entorno.

- **`hashSecretKey`**: Calcula el hash SHA-256 de la clave secreta.

- **`PokemonData`**: Interfaz para los datos de Pokémon (`id`, `name`, `abilities`).

- **`readTestData(filePath: string): Promise<PokemonData[]>`**: Lee datos desde un archivo Excel y devuelve un array de objetos `PokemonData`.

- **`ensureDirectoryExists(directoryPath: string)`**: Crea un directorio si no existe.

- **`downloadImage(imageUrl: string, savePath: string)`**: Descarga una imagen desde una URL y la guarda en una ruta especificada.

- **`validateImageFile(filePath: string)`**: Valida la extensión y el tamaño de un archivo de imagen.



## Ejecución de las pruebas

Para ejecutar las pruebas utiliza el siguiente comando:

npx playwright test

## Ejecutar pruebas específicas:

npx playwright test wiki.web.spec.ts

npx playwright test pokemon.api.spec.ts


## Visualización de los resultados

Después de ejecutar las pruebas, puedes generar un reporte HTML para visualizar los resultados. Utiliza el siguiente comando:

 npx playwright show-report



#   C h a l l a n g e P l a y w  
 