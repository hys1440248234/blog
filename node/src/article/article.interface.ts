export interface ArticleData {
    id?: number;
    title: string;
    summary: string;
    contentText: string;
    content: string;
    imageUrl: string;
    view: number;
    like: number;
    createTime?: Date;
    updateTime?: Date;
}
