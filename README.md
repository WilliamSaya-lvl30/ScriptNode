# ScriptNode

Test Gestión Operativa - Básico

## Tecnologías requeridas

- [Node.js](https://nodejs.org/es/download/)

## Instalation

Puedes usar `yarn` o `npm` para instalar las dependencias.

- `npm install` recomendado
- `yarn install`

## Establecer los permisos de scripts

Configura ese archivo para que sea ejecutable, de lo contrario, mostrara permisos denegados. Puedes revisar cómo configurar permisos utilizando el comando `chmod +x ./ScriptNode.js`

## Argumentos permitidos por línea de comandos.

- `--site` || `-s` : Configura el SITE_ID para la búsqueda.

- `--seller` || `-i` : Recibe el id del vendedor a consultar, acepta múltiples búsquedas, debe escribir el argumento antes de cada id ingresado.

- `--name` || `-n` : (opcional) Configura el nombre del output generado por el script, en búsquedas múltiples el name será complementado con el nombre por default `SELLER_NICKNAME`.

- `--path` || `-p` : (opcional) Configura la ruta donde se guardará el output generado por el script.

## Ejemplo de uso.

`./ScriptNode.js --site MLA --seller 179571326 -n archivo-de-prueba -p ../`

El archivo TIENDASMERCADOLIBRE.xls es un ejemplo del output.

## Developer

- Williams Saya <williams.sand25@gmail.com>
