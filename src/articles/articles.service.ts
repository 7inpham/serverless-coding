import { Injectable } from '@nestjs/common';
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
  async create(createArticleDto: CreateArticleDto) {
    await admin.firestore().collection('articles').doc().set(createArticleDto);
    return;
  }

  async findAll() {
    const db = admin.firestore();
    const response = await db.collection('articles').get();
    return response.docs.map(docToArticle);
  }

  async findOne(id: string) {
    const db = admin.firestore();
    const doc = await db.collection('articles').doc(id).get();
    return docToArticle(doc);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const db = admin.firestore();
    await db.collection('articles').doc(id).set(updateArticleDto);
    return;
  }

  async remove(id: string) {
    const db = admin.firestore();
    await db.collection('articles').doc(id).delete();
    return;
  }
}
