"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewInstallPage() {
  const searchParams = useSearchParams();
  const shop = searchParams.get("shop");
  const installed = searchParams.get("installed");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Se vier do callback OAuth com sucesso
    if (installed === "true" && shop) {
      // Aqui você pode fazer uma chamada para verificar o status da instalação
      console.log("App instalado com sucesso para:", shop);
    }
  }, [installed, shop]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {installed === "true" ? (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Instalação Concluída!
              </h1>
              <p className="text-gray-600 mb-4">
                Seu app Shopify foi instalado com sucesso para a loja:
              </p>
              <p className="text-sm font-mono bg-gray-100 px-3 py-2 rounded mb-6">
                {shop}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  Próximos passos:
                </p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Verifique o console do servidor</li>
                  <li>Copie o access token gerado</li>
                  <li>Adicione ao arquivo .env.local</li>
                  <li>Reinicie o servidor</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Instalar App Shopify
              </h1>
              <p className="text-gray-600 mb-6">
                Configure a integração com sua loja Shopify
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  Para instalar o app:
                </p>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Acesse a URL de instalação</li>
                  <li>Autorize as permissões solicitadas</li>
                  <li>Aguarde o redirecionamento</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
