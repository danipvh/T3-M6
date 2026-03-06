# 🛒 Gestión de Productos – Servidor Node.js + Cliente REST

## 📌 Descripción

Este proyecto consiste en la implementación de un servidor web en Node.js que expone una **API REST** para gestionar productos.
El servidor permite **consultar y agregar productos** utilizando los métodos HTTP **GET** y **POST**, almacenando la información en un archivo local.

Además, se desarrolló un cliente web que consume la API utilizando `fetch`, permitiendo visualizar los productos, ordenarlos y agregar nuevos desde la interfaz.

---

# ⚙️ Tecnologías utilizadas

* Node.js
* JavaScript
* HTML5
* CSS3
* API REST
* File System (`fs.promises`)

---

# 🖥️ Cliente Web

El cliente web permite:

* 📋 **Listar productos**
* 🔤 **Ordenar por nombre**
* 💰 **Ordenar por precio**
* ➕ **Agregar nuevos productos mediante formulario**

El cliente consume la API mediante **fetch** y muestra los resultados dinámicamente en el **DOM**.

---

# 📁 Almacenamiento de datos

Los productos se almacenan en el archivo:

```
productos.txt
```

Cada línea representa un producto con el formato:

```
nombre,precio
```

Ejemplo:

```
Zapatillas,25990
Jeans,12990
Polera,9990
```

La lectura del archivo se realiza utilizando **fs.promises** para mantener un comportamiento **no bloqueante**.

---

# 👨‍💻 Autor

Proyecto desarrollado por Daniela Villarroel 
