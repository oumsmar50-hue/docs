import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import type { Logement, PropertyType } from './components/logement-cards/logement';

type PropertyFilter = 'Tous' | PropertyType;

@Component({
  imports: [CurrencyPipe],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly locationQuery = signal('');
  protected readonly propertyFilter = signal<PropertyFilter>('Tous');
  protected readonly maxPrice = signal(0);
  protected readonly favorites = signal<number[]>([]);
  protected readonly favoritesOnly = signal(false);

  protected readonly propertyTypes: PropertyFilter[] = ['Tous', 'Appartement', 'Maison'];
  protected readonly listings: Logement[] = [
    {
      id: 1,
      title: 'La lumière du Marais',
      city: 'Paris',
      area: 'Le Marais, 3e',
      price: 1380,
      rooms: 2,
      size: 48,
      type: 'Appartement',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Salon lumineux aux tons neutres et aux matières naturelles',
      tag: 'Coup de cœur',
    },
    {
      id: 2,
      title: 'La maison des oliviers',
      city: 'Marseille',
      area: 'Endoume, 7e',
      price: 1190,
      rooms: 4,
      size: 92,
      type: 'Maison',
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Maison contemporaine ouverte sur un jardin méditerranéen',
      tag: 'Jardin',
    },
    {
      id: 3,
      title: 'Un nid au bord de l’eau',
      city: 'Lyon',
      area: 'Presqu’île, 2e',
      price: 890,
      rooms: 2,
      size: 41,
      type: 'Appartement',
      image:
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Appartement chaleureux avec parquet et mobilier contemporain',
      tag: 'Nouveau',
    },
    {
      id: 4,
      title: 'L’échappée verte',
      city: 'Bordeaux',
      area: 'Chartrons',
      price: 1050,
      rooms: 3,
      size: 67,
      type: 'Appartement',
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Pièce de vie baignée de lumière avec vue sur des arbres',
    },
    {
      id: 5,
      title: 'La maison du dimanche',
      city: 'Nantes',
      area: 'Procé',
      price: 1450,
      rooms: 5,
      size: 118,
      type: 'Maison',
      image:
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Maison familiale avec un grand salon ouvert sur l’extérieur',
    },
    {
      id: 6,
      title: 'Le calme en ville',
      city: 'Toulouse',
      area: 'Saint-Cyprien',
      price: 760,
      rooms: 2,
      size: 39,
      type: 'Appartement',
      image:
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=85',
      imageAlt: 'Appartement cosy décoré dans des tons clairs',
      tag: 'Petit budget',
    },
  ];

  protected readonly filteredListings = computed(() => {
    const query = this.locationQuery().trim().toLocaleLowerCase('fr');
    const type = this.propertyFilter();
    const maxPrice = this.maxPrice();
    const favorites = this.favorites();

    return this.listings.filter((listing) => {
      const matchesLocation =
        query.length === 0 ||
        `${listing.city} ${listing.area} ${listing.title}`.toLocaleLowerCase('fr').includes(query);
      const matchesType = type === 'Tous' || listing.type === type;
      const matchesPrice = maxPrice === 0 || listing.price <= maxPrice;
      const matchesFavorites = !this.favoritesOnly() || favorites.includes(listing.id);

      return matchesLocation && matchesType && matchesPrice && matchesFavorites;
    });
  });

  protected setLocation(event: Event): void {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
      this.locationQuery.set(input.value);
    }
  }

  protected setMaxPrice(event: Event): void {
    const select = event.target;
    if (select instanceof HTMLSelectElement) {
      this.maxPrice.set(Number(select.value));
    }
  }

  protected toggleFavorite(id: number): void {
    this.favorites.update((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    );
  }

  protected resetFilters(): void {
    this.locationQuery.set('');
    this.propertyFilter.set('Tous');
    this.maxPrice.set(0);
    this.favoritesOnly.set(false);
  }
}
