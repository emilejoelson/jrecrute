import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FlyingPlusComponent } from '../../../../../assets/svg/templates/flying-plus/flying-plus.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../../../common/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../../common/components/buttons/secondary-button/secondary-button.component';
import { CurvedArrowV2Component } from '../../../../../assets/svg/templates/curved-arrow-v2.component';
import { DemoRequestFormComponent } from '../../../../common/components/demo-request-form/demo-request-form.component';

type TSectionName = 'marketing' | 'vente' | 'facturation' | 'tresorie';

function isTSectionName(value: string): value is TSectionName {
  return ['marketing', 'vente', 'facturation', 'tresorie'].includes(value);
}

type TSmallCard = {
  title: string;
  image: string;
};

type TBigCard = {
  title: string;
  description: string;
  icon: string;
};

type TPlan = {
  name: string;
  isPopular: boolean;
  monthPrice: number;
};

type TPageDynamicContent = {
  presentationSection: { title: string; paragraph: string; image: string };
  freeTrialSection: {
    title: string;
    paragraph: string;
    smallCards: TSmallCard[];
    bigCards: TBigCard[];
  };
  plansSections: {
    title: string;
    plans: TPlan[];
  };
};

type TPagesDynamicContent = {
  [Key in TSectionName]: TPageDynamicContent;
};

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [
    FlyingPlusComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CurvedArrowV2Component,
    RouterModule,
    DemoRequestFormComponent,
  ],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss',
})
export class OurServicesComponent implements OnInit {
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  activatedQuerySection: WritableSignal<TSectionName> = signal('marketing');

  isDemoFormOpen: WritableSignal<boolean> = signal(false);

  activatedSectionContent: Signal<TPageDynamicContent> = computed(
    () => this.pageDynamicContent[this.activatedQuerySection()],
  );

  subLinks: { name: string; icon: string; queryValue: TSectionName }[] = [
    { name: 'marketing', icon: 'performance.png', queryValue: 'marketing' },
    { name: 'vente', icon: 'sell.png', queryValue: 'vente' },
    { name: 'facturation', icon: 'bill.png', queryValue: 'facturation' },
    { name: 'trésorie', icon: 'contract.png', queryValue: 'tresorie' },
  ];

  pageDynamicContent: TPagesDynamicContent = {
    marketing: {
      presentationSection: {
        title: 'marketing',
        paragraph: `Vendiiko révolutionne le marketing pour votre entreprise, vous offrant des outils puissants et intuitifs dans le but de maximiser l’impact de vos
campagnes.
Grâce à notre solution tout-en-un, créez, gérez et analysez leurs stratégies
marketing, cela depuis un tableau de bord centralisé.
Avec des analyses détaillées et des rapports en temps réel, ajustez
rapidement vos approches afin d’optimiser votre ROI.
Nous nous engageons à rendre le marketing accessible, efficace et rentable,
peu importe la taille de votre entreprise`,
        image: 'calculating-image.jpg',
      },
      freeTrialSection: {
        title:
          "Un outil d'automatisation unique pour vos équipes de vente et de marketing",
        paragraph:
          'attirez plus de leads qualifiés, concluez davantage de contrats et renforcez la fidélité de vos clients.',
        smallCards: [
          { title: 'campagne Email & sms', image: 'mail-sms.svg' },
          { title: 'Formulaire de collecte', image: 'collect-folder.svg' },
          { title: 'Ciblage et personalisation', image: 'hit-target.svg' },
          { title: 'lead scoring', image: 'stars-counter.svg' },
        ],
        bigCards: [
          {
            title: 'Générez plus de revenus',
            description:
              'Collectez des prospects grâce à des campagnes marketing intelligentes (email, SMS, Marketing Automation, formulaires, landing pages...)',
            icon: 'money-stock-arrow.svg',
          },
          {
            title: 'Gagnez du temps et de l’efficacité',
            description:
              'Synchronisez vos données avec notre outil CRM, automatisez vos actions, utilisez nos modèles pour vous inspirer.',
            icon: 'running-timer.svg',
          },
          {
            title: 'Mesurez et optimisez vos performances',
            description:
              'Testez, suivez, analysez et pilotez efficacement les performances de vos campagnes marketing.',
            icon: 'window-searching.svg',
          },
        ],
      },
      plansSections: {
        title: 'marketing',
        plans: [
          { name: 'base', isPopular: false, monthPrice: 120 },
          { name: 'pro', isPopular: true, monthPrice: 179 },
          { name: 'premium', isPopular: false, monthPrice: 210 },
        ],
      },
    },
    vente: {
      presentationSection: {
        title: 'vente',
        paragraph: `Explorez les fonctionnalités avancées de notre plateforme , conçu pour unifier toutes les données relatives à vos clients en un seul endroit. Notre solution vise à simplifier votre processus de vente en automatisant les tâches récurrentes et en optimisant l'efficacité de votre équipe commerciale. Avec notre outil intuitif, chaque prospect est une opportunité en devenir, et nous vous fournissons les moyens nécessaires pour les convertir en clients fidèles. Embarquez dans une expérience de vente transformée, où la gestion devient aussi fluide que vos ambitions de croissance`,
        image: 'shaking-hands-image.jpg',
      },
      freeTrialSection: {
        title: 'Organisez votre gestion commerciale avec Vendiiko',
        paragraph:
          'Accélérez la conversion de vos prospects en clients grâce à notre solution CRM. Elle optimise la performance de vos équipes de vente et de marketing.',
        smallCards: [
          { title: 'Automatisation des Ventes', image: 'exchange-money.svg' },
          { title: 'Suivi commerciale', image: 'manage-servers.svg' },
          { title: 'Service Client Amélioré', image: 'service-client.svg' },
        ],
        bigCards: [
          {
            title: 'Maximisez vos revenus',
            description:
              'notre solution est conçue pour optimiser votre efficacité et propulser vos ventes vers de nouveaux sommets',
            icon: 'make-more-money.svg',
          },
          {
            title: "Renforcez la synergie d'équipe",
            description:
              'Nos outils collaboratifs sont spécialement conçus pour améliorer votre productivité collective.',
            icon: 'bring-pieces.svg',
          },
          {
            title: 'Consolidez la loyauté de votre clientèle',
            description:
              'Gardez une communication claire et en offrant des expériences mémorables et satisfaisantes',
            icon: 'group-looking-for-star.svg',
          },
        ],
      },

      plansSections: {
        title: 'vente',
        plans: [
          { name: 'base', isPopular: false, monthPrice: 120 },
          { name: 'pro', isPopular: true, monthPrice: 179 },
          { name: 'premium', isPopular: false, monthPrice: 210 },
        ],
      },
    },
    facturation: {
      presentationSection: {
        title: 'facturation',
        paragraph: `Découvrez la révolution de la gestion d'entreprise avec notre plateforme en ligne conçue pour transformer et optimiser votre activité.  Avec notre solution innovante, transformez instantanément vos devis en factures d'un simple clic, éliminant ainsi les processus manuels fastidieux et réduisant les risques d'erreurs. Accélérez le cycle de vos paiements grâce à des méthodes sécurisées et modernes, assurant une tranquillité d'esprit tant pour vous que pour vos clients.  De plus, notre système d'automatisation avancé prend en charge votre saisie comptable, vous libérant des tâches répétitives et vous permettant de vous concentrer sur ce qui compte vraiment : le développement de votre entreprise. `,
        image: 'man-with-laptop.jpg',
      },
      freeTrialSection: {
        title: 'Optimisation Agile de la Facturation Intelligente',
        paragraph:
          'Révolutionnez votre Gestion Financière : Devis Automatisés, Paiements Sécurisés et Comptabilité Simplifiée',
        smallCards: [
          { title: 'Rapidité', image: 'fast-timer.svg' },
          { title: 'Personnalisation', image: 'customization.svg' },
          { title: 'Clarté et détail', image: 'new-idea.svg' },
          { title: 'Suivi après envoi', image: 'tasks-searching.svg' },
        ],
        bigCards: [
          {
            title: 'Optimisez votre facturation !',
            description:
              'Le système est conçu pour convertir efficacement vos estimations en factures sans délai.',
            icon: 'exchange-money-v2.svg',
          },
          {
            title: "Protégez votre chiffre d'affaires",
            description:
              'Boostez la rapidité de vos encaissements pour une trésorerie renforcée et une entreprise plus sécurisée.',
            icon: 'safe-formula.svg',
          },
          {
            title: 'Optimisez votre comptabilité',
            description: 'Votre service comptable gagnera un temps précieux.',
            icon: 'profit-calcule.svg',
          },
        ],
      },
      plansSections: {
        title: 'facturation',
        plans: [
          { name: 'base', isPopular: false, monthPrice: 120 },
          { name: 'pro', isPopular: true, monthPrice: 179 },
          { name: 'premium', isPopular: false, monthPrice: 210 },
        ],
      },
    },
    tresorie: {
      presentationSection: {
        title: 'Trésorerie',
        paragraph: `Notre service trésorerie révolutionnaire offre aux entrepreneurs une gestion financière sans effort, transformant la complexité en simplicité. Grâce à une interface conviviale, les utilisateurs peuvent suivre leurs flux de trésorerie en temps réel, visualiser des prévisions précises et automatiser des processus tels que la facturation et les paiements. Notre plateforme propose des outils avancés pour simplifier la gestion des comptes clients et fournisseurs, optimiser les délais de paiement et recevoir des alertes proactives pour éviter les problèmes potentiels. En centralisant toutes les opérations financières au sein d'une seule plateforme, nous permettons aux entrepreneurs de consacrer moins de temps aux tâches administratives et plus de temps à développer leur activité.`,
        image: 'man-playing.jpg',
      },
      freeTrialSection: {
        title: 'Economisez du temps chaque jour',
        paragraph:
          "Avec cet outil essentiel qui vous permet de visualiser votre trésorerie, d'établir vos prévisions en ligne et d'automatiser vos rapports.",
        smallCards: [
          {
            title: 'Unifiez votre Gestion Financière',
            image: 'golden-box.svg',
          },
          { title: 'Maîtrisez Votre Trésorerie', image: 'reconfigure.svg' },
          {
            title: 'Catégorisation Intelligente',
            image: 'folder-inside-window.svg',
          },
        ],
        bigCards: [
          {
            title: 'Prenez des décisions éclairées',
            description:
              'En simulant divers scénarios et évaluant leur impact sur votre trésorerie anticipée.',
            icon: 'decide.svg',
          },
          {
            title: "Prévoyez l'avenir",
            description:
              'En établissant des projections fiables sur 3, 6 ou 12 mois en synchronisant vos encours de facturation et vos devis.',
            icon: 'reach-distination.svg',
          },
          {
            title: 'Économisez du temps',
            description:
              'En gérant votre trésorerie de manière automatisée et sans erreurs grâce à un suivi en temps réel.',
            icon: 'money-vs-time.svg',
          },
        ],
      },
      plansSections: {
        title: 'tresorie',
        plans: [
          { name: 'base', isPopular: false, monthPrice: 120 },
          { name: 'pro', isPopular: true, monthPrice: 179 },
          { name: 'premium', isPopular: false, monthPrice: 210 },
        ],
      },
    },
  };

  navigateWithQueryParams(queryValue: TSectionName): void {
    this.router.navigate([], {
      queryParams: queryValue === 'marketing' ? {} : { section: queryValue },
    });
  }

  openDemoForm() {
    this.isDemoFormOpen.set(true);
  }

  closeDemoForm() {
    this.isDemoFormOpen.set(false);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0) {
        this.activatedQuerySection.set('marketing');
      } else if (!isTSectionName(params['section'])) {
        this.router.navigate([], { queryParams: {} });
      } else {
        this.activatedQuerySection.set(params['section']);
      }
    });
  }
}
