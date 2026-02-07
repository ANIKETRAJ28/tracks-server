export interface IElement {
  id: string;
  slideId: string;
  trackId: string;
  tagId: string;
  parentId: string;
  position: number;
  depth: number;
  metadata: object;
  content: string;
  style: object;
  decorator: object;
  createdAt: Date;
  updatedAt: Date;
}
