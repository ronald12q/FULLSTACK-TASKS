#!/bin/bash
set -e

DOMAIN=${1:-"api.todoapp.voiddev.me"}

if [ -z "$DOMAIN" ]; then
  echo "Uso: ./setup-ssl.sh api.todoapp.voiddev.me"
  exit 1
fi

echo "Instalando certbot..."
sudo apt update && sudo apt install -y certbot

echo "Obteniendo certificado para $DOMAIN..."
sudo certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN"

echo "Configurando auto-renovación..."
echo "0 0 * * * root certbot renew --quiet && docker compose restart nginx" | sudo tee /etc/cron.d/certbot-renew
sudo chmod 644 /etc/cron.d/certbot-renew

echo "Levantando servicios con HTTPS..."
docker compose up -d --build

echo "Listo! Tu API está en https://$DOMAIN"
