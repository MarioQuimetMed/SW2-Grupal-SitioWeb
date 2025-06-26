import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  isOpen = false;
  userMessage = '';
  messages: { from: 'user' | 'bot'; text: string }[] = [];

  // Prompt de contexto para el chatbot de Monee
  readonly systemPrompt = `
Eres el asistente virtual de Monee, una aplicación de finanzas personales que ayuda a los usuarios a gestionar sus gastos, ingresos, presupuestos y metas de ahorro. Tu tarea es responder de forma clara, amable y precisa cualquier pregunta que el usuario tenga sobre el funcionamiento de la app, sus características, planes, seguridad, privacidad, registro, soporte y cualquier otra consulta relacionada con Monee.

Si la pregunta del usuario no está relacionada con Monee o no tienes suficiente información para responder, indícale amablemente que puede contactar con nuestro equipo de soporte escribiendo a soporte@monee.com.

Responde siempre en español, de manera breve y profesional.
`;

  async sendMessage() {
    if (!this.userMessage.trim()) return;
    this.messages.push({ from: 'user', text: this.userMessage });

    // Combina el prompt de sistema con el mensaje del usuario
    const prompt = `${this.systemPrompt}\n\nPregunta del usuario: ${this.userMessage}`;
    this.userMessage = '';

    // Llama a tu backend o directamente a la API de Gemini IA
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=AIzaSyCSPp5QhKFWEqFgOpktruGoeTpQ8T42rA4',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }], role: 'USER' }],
        }),
      }
    );
    const data = await response.json();
    console.log('Respuesta de Gemini IA:', data);
    const botText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No hay respuesta';
    this.messages.push({ from: 'bot', text: botText });
  }
}
