interface CategoryIcon {
  url: string;
}

interface Products {
  name: string;
}
interface Category {
  id: number;
  documentId: string;
  name: string;
  colore: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon?: CategoryIcon[]; // updated for optional chaining
  products?: Products[];
  slug?: string;
}

interface TopCategoriesProps {
  categoryList: Category[];
}