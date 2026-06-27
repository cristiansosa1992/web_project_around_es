# Around The U.S.

Proyecto interactivo para editar información de perfil, cambiar la foto de avatar, agregar tarjetas de lugares, eliminar tarjetas, dar “me gusta”, abrir imágenes en una ventana modal y validar formularios.

## Tecnologías utilizadas

- HTML
- CSS
- TypeScript
- Programación orientada a objetos
- Módulos ES
- Fetch API
- API REST
- Validación de formularios

## Qué aprendimos en el proyecto

En este proyecto aprendimos a estructurar una aplicación usando TypeScript y programación orientada a objetos. Separamos responsabilidades en clases reutilizables para que cada parte del código tenga una función clara.

También trabajamos con formularios, validación, eventos del DOM, ventanas modales y comunicación con una API externa mediante peticiones HTTP. Implementamos métodos para obtener datos del usuario, cargar tarjetas iniciales, editar el perfil, cambiar el avatar, crear nuevas tarjetas, eliminar tarjetas y actualizar los “me gusta”.

Además, aprendimos a manejar estados de carga en los formularios usando un método `setLoading`, para cambiar temporalmente el texto del botón mientras se espera la respuesta del servidor.

## Refactorización

El proyecto fue refactorizado a clases reutilizables:

- `Card`
- `Section`
- `Popup`
- `PopupWithImage`
- `PopupWithForm`
- `PopupWithConfirmation`
- `FormValidator`
- `UserInfo`
- `Api`

## Funcionalidades principales

- Cargar información del usuario desde la API
- Mostrar tarjetas iniciales desde la API
- Editar nombre y descripción del perfil
- Cambiar la foto de perfil
- Agregar nuevas tarjetas
- Eliminar tarjetas
- Dar y quitar “me gusta”
- Abrir imágenes en un popup
- Cerrar popups con botón, overlay y tecla Escape
- Validar formularios antes de enviar
- Mostrar estado de carga al guardar información