export class Paginator<T = any> {
    items: T[];
    page: number;
    total: number;
    constructor(items: T[], page: number, total: number) {
      this.items = items;
      this.page = page;
      this.total = total;
    }
  }