import {
  Component,
  OnInit,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chatbot } from '../chatbot/chatbot';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, Chatbot],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  isScrolled = false;
  isBrowser: boolean;
  activeSection: string = 'inicio'; // NUEVO

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verifica si estamos en el navegador
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Inicialización del componente
    if (this.isBrowser) {
      this.checkScroll();
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }
  onScroll() {
    const sections = [
      'inicio',
      'caracteristicas',
      'precios',
      'quienes-somos',
      'contactanos',
    ];
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Detecta cuando el usuario hace scroll para cambiar estilos del header
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 30;
    }
  }

  // Método para suavizar el scroll a las secciones
  scrollToSection(sectionId: string) {
    if (this.isBrowser) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Método para enviar el formulario de contacto
  submitContactForm(event: Event) {
    event.preventDefault();

    if (this.isBrowser) {
      console.log('Formulario de contacto enviado');
      // Aquí iría la lógica para enviar el formulario a un backend
    }
  }
}
