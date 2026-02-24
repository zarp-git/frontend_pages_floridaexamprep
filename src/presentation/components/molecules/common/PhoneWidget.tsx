"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PhoneWidgetProps {
  message?: string;
  phoneNumber?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size?: "sm" | "md" | "lg";
  showPulse?: boolean;
  className?: string;
}

export default function PhoneWidget({
  message = "Oi, acabei de ver o site de vocês! Gostaria de saber mais sobre o curso",
  phoneNumber = "13214296742", // Número padrão dos EUA
  position = "bottom-right",
  size = "md",
  showPulse = true,
  className = "",
}: PhoneWidgetProps) {
  // Construir URL do WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  // Classes de posicionamento
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  // Classes de tamanho
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.175, 0.885, 0.32, 1.275], // backOut approximation
        delay: 1,
      }}
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
    >
      {/* Efeito Radar Pulse */}
      {showPulse && (
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className={`absolute inset-0 bg-green-500 rounded-full ${sizeClasses[size]}`}
        />
      )}

      {/* Widget Principal */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative ${sizeClasses[size]} bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-colors duration-300 cursor-pointer group`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full flex items-center justify-center"
          aria-label="Enviar mensagem no WhatsApp"
        >
          <div className="flex items-center justify-center">
            <Image
              src="/images/about-us-section/whtasapp-icon.svg"
              alt="WhatsApp"
              width={iconSizes[size]}
              height={iconSizes[size]}
              className="text-white"
            />
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
