import { Post } from '../models/post';
import * as JsPDF from 'jspdf';
import dateFormat from 'dateformat';

export class PdfMaker {

  private readonly posts: Post[];
  private leftMargin = 20;
  private rightMargin = 180;
  private upMargin = 20;
  private pdf = new JsPDF();
  private saveDate = new Date();
  private pages: number;
  private dateTimeFormat = 'dd-mm-yyyy HH:MM:ss';
  private printMode: boolean;

  constructor(posts: Post[]) {
    this.posts = posts;
    this.pdf.setFont('times');
    this.pdf.setFontSize(12);
    this.pdf.setFontStyle('normal');
    this.pages = posts.length - 1;
    this.printMode = false;
  }

  printPosts() {
    this.printMode = true;
    this.createPdfForPosts();
  }

  createPdfForPosts() {
    this.createPages();
    this.printOrSaveFile();
  }

  private createPages() {
    for (const post of this.posts) {
      this.fillPageWithPostData(post);
      this.addNewPage();
    }
  }

  private fillPageWithPostData(post: Post) {
    const titleArray = this.pdf.splitTextToSize(post.title, this.rightMargin);
    const contentArray = this.pdf.splitTextToSize(post.description, this.rightMargin);

    this.addAuthor(post.user);
    this.addCreateDate(dateFormat(post.createDate, this.dateTimeFormat));
    this.addTitle(titleArray);
    this.addContent(contentArray);
    this.addTags(post.tags.toString());
  }

  private addAuthor(user: String) {
    this.addHeader('Author: ');
    this.addValue(user);
  }

  private addCreateDate(createDate: String) {
    this.addHeader('Create date: ');
    this.addValue(createDate);
  }

  private addTitle(title: Array<String>) {
    this.addHeader('Title: ');
    this.addValueFromArray(title);
  }

  private addContent(content: Array<String>) {
    this.addHeader('Content: ');
    this.addValueFromArray(content);
  }

  private addTags(tags: String) {
    this.addHeader('Tags: ');
    this.addValue(tags);
  }

  private addHeader(text: String) {
    this.pdf.setFontStyle('bold');
    this.pdf.text(text, this.leftMargin, this.upMargin);
    this.upMargin += 5;
  }

  private addValue(value: String) {
    this.pdf.setFontStyle('normal');
    this.pdf.text(value, this.leftMargin, this.upMargin);
    this.upMargin += 10;
  }

  private addValueFromArray(values: Array<String>) {
    this.pdf.setFontStyle('normal');
    this.pdf.text(values, this.leftMargin, this.upMargin);
    this.upMargin = this.upMargin + (5 * values.length) + 5;
  }

  private addNewPage() {
    if (this.pages !== 0) {
      this.upMargin = 20;
      this.pdf.addPage('1', 'a4');
      this.pages--;
    }
  }

  private printOrSaveFile() {
    if (this.printMode) {
      this.pdf.autoPrint();
    }

    this.saveFile();

  }

  private saveFile() {
    const fileName = `posts-${ dateFormat(this.saveDate, this.dateTimeFormat) }.pdf`;
    this.pdf.save(fileName);
  }
}
