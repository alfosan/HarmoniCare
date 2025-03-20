<div align="center">

# 🏥 HarmoniCare ✨  
### Tu solución digital para la gestión integral de la nutrición y el cuidado - Proyecto TFG 2ºDAW  

![Harmoni Care Banner](https://github.com/alfosan/HarmoniCare/blob/main/Banner-HarminiCare.png)

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-brightgreen)]()
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)]()
[![Versión](https://img.shields.io/badge/Versión-2.0.0-orange)]()
[![Documentación](https://img.shields.io/badge/Docs-Ready-success)]()
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)]()
[![Tests](https://img.shields.io/badge/Tests-Passing-success)]()
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-blueviolet)]()

---

<p align="center">  
  <a href="#-características">Características</a> •  
  <a href="#-instalación">Instalación</a> •  
  <a href="#-arquitectura">Arquitectura</a> •  
  <a href="#-vistas">Vistas</a> •  
  <a href="#-equipo">Equipo</a>  
</p>  

</div>  

## 🌟 Bienvenidos a HarmoniCare  

> *"Transformando la nutrición y el cuidado en una experiencia personalizada y eficiente"*  

HarmoniCare es un proyecto desarrollado como parte de mi Trabajo de Fin de Grado (TFG) en 2ºDAW. Este sistema está diseñado para optimizar la gestión nutricional y el cuidado de pacientes, combinando tecnología avanzada con un enfoque centrado en la salud y el bienestar. 🎯  

## ✨ Características Principales  

<table>  
<tr>  
<td width="50%">  

### 🎨 Gestión de Actividades  
- 📅 Calendario interactivo de eventos  
- 🎯 Sistema de inscripción inteligente  
- ⏰ Recordatorios automáticos  
- 🤝 Actividades grupales e individuales  
- 📊 Seguimiento de participación  

</td>  
<td width="50%">  

### 🍏 Gestión Nutricional  
- 🥗 Planificación personalizada de dietas  
- 📈 Seguimiento de objetivos nutricionales  
- ⚠️ Alertas de alergias y restricciones  
- 🍎 Menús semanales adaptados  
- 📱 App para cocina y pacientes  

</td>  
</tr>  

<tr>  
<td width="50%">  

### 💊 Gestión de Medicamentos  
- ⏰ Programación de dosis  
- 📋 Historial médico digital  
- 🔔 Notificaciones inteligentes  
- 💉 Control de inventario  
- 👩‍⚕️ Conexión con personal médico  

</td>  
<td width="50%">  

### 📱 Sistema de Notificaciones  
- 📲 Notificaciones en app  
- 📱 WhatsApp integrado  
- 📧 Alertas por email  
- 🤖 Bot de Telegram  
- 🔄 Sincronización en tiempo real  

</td>  
</tr>  
</table>  

## 🚀 Arquitectura Tecnológica  

<div align="center">

  ```mermaid

graph TB
    %% Sección de Clientes
    subgraph Clients ["📱 Clientes"]
        Browser["🌐 Navegador/Móvil (Angular, Next.js)"]
    end
    %% Sección de Frontend
    subgraph Frontend ["🎨 Frontend"]
        Angular["🔐 Angular (Auth)"]
        Next["🌐 Next.js (App Principal)"]
    end
    %% Sección de Backend
    subgraph Backend ["⚙️ Backend"]
        Spring["🍃 Spring Boot (Pagos)"]
        Django["🐍 Django (Core, Usuarios)"]
        Express["🚂 Express.js (WebSockets)"]
    end
    %% Sección de Almacenamiento
    subgraph Storage ["💾 DB"]
        Postgres["🛢️ PostgreSQL"]
    end
    %% Sección de Infraestructura
    subgraph Infra ["☁️ Infra"]
        Firebase["🔥 Firebase (Auth)"]
        AWS["☁️ AWS S3 (Archivos)"]
        Docker["🐳 Docker"]
    end
    %% Conexiones
    Clients --> Frontend
    Frontend --> Backend
    Backend --> Storage
    Backend --> Infra
    %% Estilos personalizados
    style Clients fill:#ffdd57,stroke:#000,stroke-width:2px
    style Frontend fill:#ff9900,stroke:#000,stroke-width:2px
    style Backend fill:#00aaff,stroke:#000,stroke-width:2px
    style Storage fill:#33cc33,stroke:#000,stroke-width:2px
    style Infra fill:#ff66cc,stroke:#000,stroke-width:2px

```

</div>


<div align="center">

  ```mermaid



```

</div>



## 💻 Stack Tecnológico

### Frontend Powerhouse
- **🔐 Auth Service**: Angular 18
  ```typescript
  const security = "máxima prioridad" 
  ```
- **🌐 Main Application**: Next.js 15
  ```javascript
  const performance = "optimizada"
  ```

### Backend Robusto
- **🍃 Spring Boot**: Gestión de pagos y reservas
- **🐍 Django**: Core del sistema y usuarios
- **🚂 Express**: Sistema de notificaciones

## 🛠️ Instalación y Configuración

### Requisitos del Sistema

#### Lenguajes y Runtimes
| Componente | Versión | Descripción |
|------------|---------|-------------|
| Node.js    | ≥16.x   | Runtime para aplicaciones JavaScript |
| Python     | ≥3.9    | Backend Django REST Framework |
| Java       | ≥17     | Backend Spring Boot |
| TypeScript | ≥4.x    | Tipado estático para JavaScript |

#### Frameworks y Librerías
| Componente | Versión | Descripción |
|------------|---------|-------------|
| Angular    | ≥19.x   | Framework frontend |
| React      | ≥18.x   | Librería frontend |
| Next.js    | ≥13.x   | Framework React SSR |
| Django     | ≥4.x    | Framework Python |
| Spring Boot| ≥3.x    | Framework Java |
| Express    | ≥4.x    | Framework Node.js |

#### Bases de Datos y Cache
| Componente | Versión | Descripción |
|------------|---------|-------------|
| PostgreSQL | ≥13     | Base de datos principal |
| Redux      | ≥7.x    | Sistema de store |

#### Herramientas de Desarrollo
| Componente | Versión | Descripción |
|------------|---------|-------------|
| Docker     | ≥20.x   | Contenedorización |
| Git        | ≥2.x    | Control de versiones |
| npm/yarn   | ≥8.x    | Gestores de paquetes JS |
| pip        | ≥22.x   | Gestor de paquetes Python |
| Gradle      | ≥3.x    | Gestor de dependencias Java |

#### Seguridad y Autenticación
| Componente | Versión | Descripción |
|------------|---------|-------------|
| JWT        | ≥9.x    | Tokens de autenticación |
| Argon2     | ≥21.x   | Hashing de contraseñas |
| OAuth2     | ≥2.0    | Protocolo de autorización |

### 🚀 Inicio Rápido con Docker

```bash
# Clonar el repositorio
git clone https://github.com/alfosan/HarmoniCare.git

# Iniciar con Docker Compose
docker-compose up -d
```

## 📸 Vistas del Sistema

<div align="center">
<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/400x300?text=Dashboard" alt="Dashboard"/>
<br>
<em>Dashboard Principal 🎮</em>
</td>
<td align="center">
<img src="https://via.placeholder.com/400x300?text=Actividades" alt="Actividades"/>
<br>
<em>Gestión de Actividades 🎨</em>
</td>
</tr>
<tr>
<td align="center">
<img src="https://via.placeholder.com/400x300?text=Dietas" alt="Dietas"/>
<br>
<em>Sistema de Dietas 🥗</em>
</td>
<td align="center">
<img src="https://via.placeholder.com/400x300?text=Medicamentos" alt="Medicamentos"/>
<br>
<em>Control de Medicamentos 💊</em>
</td>
</tr>
</table>
</div>

## 👥 Nuestro Increíble Equipo

<div align="center">

| <img src="https://github.com/2-DAW-PROJECTS/images_proyects/blob/master/bobesponja.png" alt="Llorenç profile" width="150" height="150" /> |
|:---:|
| **Llorenç Alfonso Sanchis** |
| ⚙️ Full Stack |
| [![GitHub](https://img.shields.io/badge/GitHub-alfosan-black?style=flat-square&logo=github)](https://github.com/alfosan) |

</div>

## 🤝 ¿Quieres Contribuir?

¡Tu ayuda es bienvenida! Sigue estos pasos:

1. 🍴 Fork el proyecto
2. 🔧 Crea tu Feature Branch
   ```bash
   git checkout -b feature/CaracteristicaIncreible
   ```
3. 💫 Commit tus cambios
   ```bash
   git commit -m '✨ Add: Característica Increíble'
   ```
4. 📤 Push a la Branch
5. 🎉 Abre un Pull Request

## 📝 Licencia

<div align="center">  

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles  

---  

### 🌟 ¿Necesitas Ayuda?  

[![Email](https://img.shields.io/badge/Email-support%40harmonicare.com-blue?style=for-the-badge&logo=mail.ru)](mailto:support@harmonicare.com)  
[![Twitter](https://img.shields.io/badge/Twitter-%40HarmoniCare-blue?style=for-the-badge&logo=twitter)](https://twitter.com/HarmoniCare)  
[![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289DA?style=for-the-badge&logo=discord)](https://discord.gg/harmonicare)  

<p align="center">  
  <sub>Made with 💖 & ☕ by HarmoniCare Team</sub>  
</p>  

</div>  

