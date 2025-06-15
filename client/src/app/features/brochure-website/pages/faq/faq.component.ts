import { Component, OnInit } from '@angular/core';
import { FlyingPlusComponent } from '../../../../../assets/svg/templates/flying-plus/flying-plus.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaqQuestionMarkImageComponent } from '../../../../../assets/svg/templates/faq-question-mark.component';
import { FaqCategoryComponentComponent } from './ui/faq-category-component/faq-category-component.component';
import { Category } from './category';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    FlyingPlusComponent,
    ReactiveFormsModule,
    FaqQuestionMarkImageComponent,
    FaqCategoryComponentComponent,
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit {
  questionForm = new FormGroup({
    questionInput: new FormControl(''),
  });
  searchQuery: string | null = null;

  selectedCategories = new Set<number>();
  selectedQuestions = new Set<number>();

  filteredCategories: Category[] | null = null;

  //every category and every question must have a unique id.
  categories: Category[] = [
    {
      id: 1,
      categorieName: 'Généralités sur la Plateforme',
      questions: [
        {
          id: 1,
          question: "Qu'est-ce que VENDIIKO ?",
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 2,
          question: 'Quelle est notre mission ?',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },

        {
          id: 3,
          question: 'Quels sont nos valeurs et engagements ?',
          answer:
            "Nous nous engageons à l'innovation continue, à l'excellence du service client et à la sécurité des données. Nous valorisons la transparence, la collaboration et l'engagement envers nos clients.",
        },
      ],
    },
    {
      id: 2,
      categorieName: 'Inscription et Compte',
      questions: [
        {
          id: 4,
          question: "Comment puis-je m'inscrire à  VENDIIKO ?",
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 5,
          question: 'Comment réinitialiser mon mot de passe ?',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },

        {
          id: 6,
          question:
            'Comment puis-je mettre à jour mes informations personnelles ?',
          answer:
            "Nous nous engageons à l'innovation continue, à l'excellence du service client et à la sécurité des données. Nous valorisons la transparence, la collaboration et l'engagement envers nos clients.",
        },
      ],
    },
    {
      id: 3,
      categorieName: 'Fonctionnalités de la Plateforme',
      questions: [
        {
          id: 7,
          question:
            'Quelles sont les principales fonctionnalités de VENDIIKO ?',
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 8,
          question:
            'Comment la gestion de projet fonctionne-t-elle sur votre VENDIIKO ?',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },

        {
          id: 9,
          question:
            "Comment puis-je intégrer VENDIIKO avec d'autres outils que j'utilise ?",
          answer:
            "Nous nous engageons à l'innovation continue, à l'excellence du service client et à la sécurité des données. Nous valorisons la transparence, la collaboration et l'engagement envers nos clients.",
        },
      ],
    },

    {
      id: 4,
      categorieName: 'Tarification et paiement',
      questions: [
        {
          id: 10,
          question: 'Quels sont les plans tarifaires disponibles ?',
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 11,
          question: 'Quelles méthodes de paiement acceptez-vous ?',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },

        {
          id: 12,
          question: 'Comment puis-je annuler ou modifier mon abonnement ?',
          answer:
            "Nous nous engageons à l'innovation continue, à l'excellence du service client et à la sécurité des données. Nous valorisons la transparence, la collaboration et l'engagement envers nos clients.",
        },
      ],
    },

    {
      id: 5,
      categorieName: 'Sécurité et Confidentialité',
      questions: [
        {
          id: 13,
          question: 'Comment VENDIIKO protège-t-elle mes données ?',
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 14,
          question:
            'VENDIIKO est-elle conforme au RGPD ( Règlement Général sur la Protection des Données )',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },

        {
          id: 15,
          question: 'Comment puis-je supprimer mon compte ?',
          answer:
            "Nous nous engageons à l'innovation continue, à l'excellence du service client et à la sécurité des données. Nous valorisons la transparence, la collaboration et l'engagement envers nos clients.",
        },
      ],
    },

    {
      id: 6,
      categorieName: 'Résolution de problèmes',
      questions: [
        {
          id: 16,
          question: 'Que faire si je rencontre un problème technique ?',
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 17,
          question: 'Comment signaler un bug ou une erreur ?',
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },
      ],
    },

    {
      id: 7,
      categorieName: 'Support et assistance',
      questions: [
        {
          id: 18,
          question: 'Comment contacter le support client ?',
          answer:
            "Nous sommes une entreprise spécialisée dans la fourniture de solutions de gestion d'entreprise en ligne, dédiées à simplifier et optimiser les processus opérationnels des entrepreneurs et des PME",
        },

        {
          id: 19,
          question:
            "Où puis-je trouver des tutoriels ou des guides d'utilisation ?",
          answer:
            "Notre mission est de rendre la gestion d'entreprise accessible, intuitive et efficace grâce à une plateforme tout-en-un qui répond aux besoins spécifiques des entrepreneurs modernes.",
        },
      ],
    },
  ];

  /* private methods */
  //this function calculate the number of words inside category questions that match the searchQuery.
  private numberOfMatches(
    searchQuery: string,
    questionsList: string[],
  ): number {
    //init a counter start with 0
    let count = 0;

    //split searchQuery into uppercase words and remove the empty words
    //Ex: 'this is a search query' => ['THIS','IS','A','SEARCH','QUERY']
    const tokens = searchQuery
      .trim()
      .split(' ')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length);

    //loop over the tokens
    for (let token of tokens) {
      //over questions list
      for (let question of questionsList) {
        //split the question into words
        const words = question
          .trim()
          .split(' ')
          .map((w) => w.trim().toLowerCase());

        //add the number of matches to the counter
        count += words.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue === token ? 1 : 0),
          0,
        );
      }
    }
    return count;
  }

  private getFilteredCategories(searchQuery: string): Category[] {
    //rank the categories based on their matches
    const result = this.categories
      .map((category) => {
        const questions = category.questions.map((q) => q.question);
        const matches = this.numberOfMatches(searchQuery, questions);
        return { ...category, rank: matches };
      })
      .filter((category) => category.rank > 0);

    //sort them in asc desc order
    result.sort((a, b) => a.rank - b.rank);
    result.reverse();

    //remove the the rank entry from the result
    return result.map((category) => {
      const { rank, ...rest } = category;
      return rest;
    });
  }

  //public methods
  selectCategory(categoryId: number) {
    //check if the category is already selected.
    //if already selected remove it from the set.
    if (this.selectedCategories.has(categoryId)) {
      const categoryQuestions = this.categories.find(
        (cat) => cat.id === categoryId,
      )?.questions;

      this.selectedCategories.delete(categoryId);

      //and deselect it's questions
      if (categoryQuestions) {
        categoryQuestions.forEach((question) => {
          if (this.selectedQuestions.has(question.id)) {
            this.selectedQuestions.delete(question.id);
          }
        });
      }

      return;
    }

    //else select it.
    this.selectedCategories.add(categoryId);
  }

  selectQuestion(questionId: number) {
    //check if the question is already selected.
    //if already selected remove it from the set.
    if (this.selectedQuestions.has(questionId)) {
      this.selectedQuestions.delete(questionId);
      return;
    }

    //else select it
    this.selectedQuestions.add(questionId);
  }

  //private event handlers
  private onChange(value: string) {
    //check if the input field value is empty
    //if it's empty, clear the search result, and return the default categories
    if (value.trim().length === 0) {
      this.filteredCategories = null;
      this.searchQuery = null;
      this.selectedCategories.clear();
      this.selectedQuestions.clear();
      return;
    }

    //assign it the this searchQuery property
    this.searchQuery = value.trim();

    //update the filteredCategories with new result
    this.filteredCategories = this.getFilteredCategories(this.searchQuery);

    //clear the selected categories and the selected questions
    this.selectedCategories.clear();
    this.selectedQuestions.clear();

    //select the result categories
    this.filteredCategories.forEach((cat) => {
      this.selectedCategories.add(cat.id);
    });
  }

  //hooks
  ngOnInit(): void {
    //subscribe to the questionInput, to fire onChange method each time the input value changed
    this.questionForm.get('questionInput')?.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.onChange(value);
      }
    });
  }
}
