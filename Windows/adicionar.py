import requests

# Como o monitor está no seu Windows, usamos localhost
URL_LOCAL = "http://localhost:3000/add"

def enviar():
    print("=== ADICIONAR SITE AO MEU MONITOR ===")
    novo_site = input("Digite a URL (ex: google.com): ").strip()
    
    if not novo_site.startswith('http'):
        novo_site = "https://" + novo_site

    try:
        payload = {"url": novo_site}
        r = requests.post(URL_LOCAL, json=payload, timeout=5)
        
        if r.status_code == 200:
            print(f"✅ Enviado com sucesso para o monitor!")
        else:
            print(f"❌ Erro no monitor: {r.status_code}")
            
    except Exception as e:
        print(f"❌ Falha ao conectar: {e}")

if __name__ == "__main__":
    enviar()