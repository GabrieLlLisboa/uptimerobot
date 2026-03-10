import requests

# Portas altas definidas pelo Samuel
PORTA_LINUX = "7177"
PORTA_WINDOWS = "7180"

def enviar_site():
    print("1 - Enviar para PC do Samuel (Linux)")
    print("2 - Enviar para MEU PC (Windows)")
    opcao = input("Escolha o destino: ")

    site = input("Digite a URL do site: ").strip()
    if not site.startswith('http'):
        site = "https://" + site

    if opcao == "1":
        url_final = f"http://mistarts.sytes.net:{PORTA_LINUX}/add"
    else:
        url_final = f"http://localhost:{PORTA_WINDOWS}/add"

    try:
        r = requests.post(url_final, json={"url": site}, timeout=10)
        if r.status_code == 200:
            print("✅ Enviado com sucesso!")
        else:
            print(f"❌ Erro no destino: {r.status_code}")
    except Exception as e:
        print(f"❌ Falha de conexão: {e}")

if __name__ == "__main__":
    enviar_site()