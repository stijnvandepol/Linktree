# Linktree Project

This project is a simple Linktree clone built with HTML and CSS. It is hosted in a Docker container and served to the public through Cloudflared at [stijnvandepol.nl](https://stijnvandepol.nl)

## Features

- Responsive layout
- Easy to customize

## Getting Started

### Prerequisites

- Docker installed on your machine

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/stijnvandepol/Linktree.git
    cd Linktree
    ```

2. Build the Docker image:
    ```sh
    docker build -t linktree .
    ```

3. Run the Docker container:
    ```sh
    docker run -d -p 80:80 linktree
    ```

## Usage

Customize the `index.html` and `styles.css` files to add your own links and styles.

