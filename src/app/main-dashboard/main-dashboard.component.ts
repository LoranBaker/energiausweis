// Updated main-dashboard.component.ts
import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { CommonModule } from '@angular/common';

interface EnergyInfo {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  fallbackText?: string; // Add fallback for emoji support issues
}

interface Feature {
  icon: string;
  text: string;
  color: string;
  bgGradient: string;
}

interface PricingPlan {
  type: string;
  price: string;
  originalPrice?: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  prerequisites?: string;
  icon: string;
  gradient: string;
  badge?: string;
}

@Component({
  selector: 'app-main-dashboard',
  imports: [CommonModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) rotateY(90deg)' }),
        animate('0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'scale(1) rotateY(0deg)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
          stagger(150, [
            animate('0.7s cubic-bezier(0.34, 1.56, 0.64, 1)', 
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) rotateX(20deg)' }),
        animate('0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({ opacity: 1, transform: 'scale(1) rotateX(0deg)' }))
      ])
    ]),
    trigger('bounceIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.3)' }),
        animate('0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class MainDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('orbContainer', { static: true }) orbContainer!: ElementRef;

  // Component state
  isLoaded = false;
  mousePosition = { x: 0, y: 0 };

  // UPDATED: Enhanced data with fallback text for emoji issues
  energyInfoItems: EnergyInfo[] = [
    {
      title: 'Gesetzestext',
      description: 'Der Energieausweis ist im Gebäudeenergiegesetz (GEG) in den §§ 79 ff. geregelt und für alle Wohngebäude verpflichtend.',
      icon: '📋',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fallbackText: 'LAW'
    },
    {
      title: 'Gesetzliche Informationspflicht',
      description: 'Bei Vermietung oder Verkauf müssen Sie den Energieausweis unaufgefordert vorlegen und die Kennwerte in Immobilienanzeigen angeben.',
      icon: '⚖️',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      fallbackText: 'INFO'
    },
    {
      title: 'Immobilienanzeige',
      description: 'Verbrauchswerte des Energieausweises müssen bereits in der Immobilienanzeige deutlich sichtbar genannt werden.',
      icon: '🏠',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      fallbackText: 'HOME'
    }
  ];

  features: Feature[] = [
    { 
      icon: '⚡',
      text: '10 Jahre rechtsgültig nach GEG',
      color: '#4facfe',
      bgGradient: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)'
    },
    { 
      icon: '🚀',
      text: 'Erhalt innerhalb von 48 Stunden',
      color: '#f5576c',
      bgGradient: 'linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)'
    },
    { 
      icon: '📞',
      text: 'Telefonischer Support inklusive',
      color: '#667eea',
      bgGradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
    },
  ];

  pricingPlans: PricingPlan[] = [
    {
      type: 'Verbrauchsausweis',
      price: '79',
      originalPrice: '99',
      subtitle: 'Nur geeignet für Wohngebäude mit folgenden Voraussetzungen',
      features: [
        'Bequeme online-Dateneingabe',
        'Inklusive Telefonischem Support bei Fragen',  
        'Ermittlung von Energieverbrauch für Heizung & Warmwasser',
        'Validierung Ihrer Eingaben',
        'Rechtsgültiger Energieausweis nach aktuellem GEG, 10 Jahre gültig',
        'Durch Energieberater zertifiziert',
        'PDF-Vorschau Ihres Energieausweises',
        'Inklusive Auflistung Verbesserungsmaßnahmen'
      ],
      buttonText: 'Jetzt Verbrauchsausweis bestellen',
      isPopular: true,
      prerequisites: 'Ihr Gebäude muss jünger als 1977 sein oder mehr als vier Wohneinheiten haben (auch wenn Bj. älter als 1978 ist). Sie sollten drei aufeinanderfolgende Heizkostenabrechnungen der letzten vier Jahre vorweisen.',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      badge: 'BELIEBT'
    },
    {
      type: 'Bedarfsausweis',
      price: '99',
      subtitle: 'Datenerfassung durch Käufer',
      features: [
        'Bequeme online-Dateneingabe',
        'Inklusive Telefonischem Support bei Fragen',
        'Erfassung energetischer Beschaffenheit des Gebäudes',
        'Validierung Ihrer Eingaben',
        'Rechtsgültiger Energieausweis nach aktuellem GEG, 10 Jahre gültig',
        'Durch Energieberater zertifiziert',
        'Inklusive Auflistung Verbesserungsmaßnahmen',
        'Individuelle Bewertung des Energiebedarfs',
        'PDF-Vorschau Ihres Energieausweises'
      ],
      buttonText: 'Jetzt Bedarfsausweis erstellen',
      prerequisites: 'Ihr Gebäude muss älter als 1978 sein.',
      icon: '🏗️',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ];

  // Enhanced orb configuration with more variety
  orbs = [
    { 
      size: 400, 
      color: 'rgba(102, 126, 234, 0.3)', 
      position: { top: '5%', left: '5%' },
      delay: 0,
      blur: '2px'
    },
    { 
      size: 250, 
      color: 'rgba(245, 87, 108, 0.4)', 
      position: { top: '50%', right: '10%' },
      delay: -5,
      blur: '1px'
    },
    { 
      size: 300, 
      color: 'rgba(75, 172, 254, 0.35)', 
      position: { bottom: '15%', left: '15%' },
      delay: -10,
      blur: '1.5px'
    },
    { 
      size: 180, 
      color: 'rgba(240, 147, 251, 0.45)', 
      position: { top: '20%', right: '40%' },
      delay: -15,
      blur: '0.5px'
    },
    { 
      size: 220, 
      color: 'rgba(0, 212, 170, 0.3)', 
      position: { bottom: '40%', right: '20%' },
      delay: -20,
      blur: '1px'
    }
  ];

  ngOnInit(): void {
    // Trigger entrance animations with delay
    setTimeout(() => {
      this.isLoaded = true;
    }, 200);
  }

  // CRITICAL: Add AfterViewInit to check emoji support
  ngAfterViewInit(): void {
    // Check emoji support after view initialization
    setTimeout(() => {
      this.checkEmojiSupport();
    }, 1000); // Give more time for emojis to load
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // NEW METHOD: Check if emojis are rendering properly and add fallbacks
  private checkEmojiSupport(): void {
    console.log('Checking emoji support...');
    
    // Check info section icons
    const infoIcons = document.querySelectorAll('.info-icon');
    infoIcons.forEach((iconElement: Element, index: number) => {
      const element = iconElement as HTMLElement;
      
      // Check if emoji is rendering properly (should have width > 10px)
      const rect = element.getBoundingClientRect();
      console.log(`Icon ${index} dimensions:`, rect.width, 'x', rect.height);
      
      if (rect.width < 10 || rect.height < 10 || element.offsetWidth < 10) {
        console.log(`Emoji not rendering for info item ${index}, using fallback`);
        
        // Add fallback styling
        element.classList.add('text-fallback');
        element.style.fontSize = '1.5rem';
        element.style.fontWeight = '800';
        element.style.fontFamily = 'Inter, sans-serif';
        
        // Use fallback text
        if (this.energyInfoItems[index]?.fallbackText) {
          element.textContent = this.energyInfoItems[index].fallbackText;
        }
      }
    });
    
    // Check section icon
    const sectionIcon = document.querySelector('.section-icon') as HTMLElement;
    if (sectionIcon) {
      const rect = sectionIcon.getBoundingClientRect();
      console.log('Section icon dimensions:', rect.width, 'x', rect.height);
      
      if (rect.width < 15 || rect.height < 15) {
        console.log('Section icon not rendering, using fallback');
        sectionIcon.textContent = '💡';
        sectionIcon.style.fontSize = '2.5rem';
        sectionIcon.style.fontWeight = '800';
        sectionIcon.style.color = '#4facfe';
      }
    }
    
    // Check other emoji icons (hero, features, etc.)
    const allEmojis = document.querySelectorAll('.badge-icon, .btn-icon, .preview-icon, .stat-icon, .cert-logo, .feature-icon, .features-icon, .warning-icon, .guarantee-icon');
    allEmojis.forEach((emoji: Element) => {
      const element = emoji as HTMLElement;
      const rect = element.getBoundingClientRect();
      
      if (rect.width < 8 || rect.height < 8) {
        console.log('Emoji not rendering:', element.textContent);
        element.style.fontSize = '1.2rem';
        element.style.fontWeight = '800';
        element.style.color = '#4facfe';
      }
    });
  }

  // NEW METHOD: Force refresh icons (call this manually if needed)
  public refreshIcons(): void {
    setTimeout(() => {
      this.checkEmojiSupport();
    }, 100);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mousePosition.x = event.clientX / window.innerWidth;
    this.mousePosition.y = event.clientY / window.innerHeight;
    
    this.updateOrbPositions();
  }

  navigateToQuestionnaire(): void {
  window.open('https://envalpro-impact.com/questionnaire/', '_blank');
}

  private updateOrbPositions(): void {
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb: Element, index: number) => {
      const speed = (index + 1) * 0.015;
      const x = (this.mousePosition.x - 0.5) * speed * 120;
      const y = (this.mousePosition.y - 0.5) * speed * 120;
      (orb as HTMLElement).style.transform = `translate(${x}px, ${y}px) scale(${1 + (this.mousePosition.x * 0.1)})`;
    });
  }

  scrollToPricing(): void {
    const pricingSection = document.querySelector('.pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onCreateCertificate(event: Event, planType?: string): void {
    const button = event.target as HTMLButtonElement;
    this.createAdvancedRippleEffect(event, button);
    
    // Add loading state
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Wird erstellt...';
    
    // Simulate certificate creation
    const certificateType = planType || 'premium';
    console.log(`Creating ${certificateType} energy certificate...`);
    
    // Reset button after delay
    setTimeout(() => {
      button.disabled = false;
      if (planType === 'Verbrauchsausweis') {
        button.innerHTML = 'Jetzt Verbrauchsausweis bestellen';
      } else {
        button.innerHTML = 'Jetzt Bedarfsausweis erstellen';
      }
    }, 2000);
  }

  private createAdvancedRippleEffect(event: Event, element: HTMLElement): void {
    const mouseEvent = event as MouseEvent;
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = mouseEvent.clientX - rect.left - size / 2;
    const y = mouseEvent.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%);
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: advancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 10;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  }

  // Utility method for dynamic styling with enhanced effects
  getOrbStyle(orb: any): any {
    return {
      width: `${orb.size}px`,
      height: `${orb.size}px`,
      background: `radial-gradient(circle at 30% 30%, ${orb.color}, ${orb.color.replace(/0\.\d+/, '0.1')})`,
      ...orb.position,
      'animation-delay': `${orb.delay}s`,
      'filter': `blur(${orb.blur || '1px'}) brightness(1.1)`,
      'box-shadow': `0 0 ${orb.size/4}px ${orb.color}`
    };
  }

  // Track by functions for performance
  trackByIndex(index: number, item: any): number {
    return index;
  }

  trackByTitle(index: number, item: EnergyInfo): string {
    return item.title;
  }

  trackByPlanType(index: number, item: PricingPlan): string {
    return item.type;
  }
}