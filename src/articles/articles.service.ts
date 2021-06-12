import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import * as admin from 'firebase-admin';

function docToArticle(doc: FirebaseFirestore.DocumentData): Article {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    image: data.image,
    content: data.content,
  };
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const doc = admin.firestore().collection('articles').doc();
    await doc.set(createArticleDto);
    const article = {
      id: doc.id,
      title: createArticleDto.title,
      image: createArticleDto.image,
      content: createArticleDto.content,
    };
    await this.articlesRepository.insert(article);
    return article;
  }

  async findAll(): Promise<Article[]> {
    const db = admin.firestore();
    const response = await db.collection('articles').get();
    return response.docs.map(docToArticle);
  }

  async findOne(id: string): Promise<Article> {
    const db = admin.firestore();
    const doc = await db.collection('articles').doc(id).get();
    return docToArticle(doc);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const db = admin.firestore();
    const doc = db.collection('articles').doc(id);
    await doc.set(updateArticleDto);
    const article = {
      id: doc.id,
      title: updateArticleDto.title,
      image: updateArticleDto.image,
      content: updateArticleDto.content,
    };
    await this.articlesRepository.update({ id: id }, updateArticleDto);
    return article;
  }

  async remove(id: string) {
    const db = admin.firestore();
    await db.collection('articles').doc(id).delete();
    await this.articlesRepository.delete({ id: id });
    return;
  }
}
