import { Pool } from 'pg';

import { ISlide, ISlideRequest } from '../interface/slide.interface';
import { pool } from '../util/dbPool.util';

export class SlideRepository {
  private clientPool: Pool;

  constructor() {
    this.clientPool = pool;
  }

  async createSlide(reqObj: ISlideRequest & { position: number }) {
    const client = await this.clientPool.connect();
    try {
      const query = `
      INSERT INTO slides
      (title, track_id, position)
      VALUES ($1, $2, $3)
      RETURNING *;
      `;
      const values = [reqObj.title, reqObj.track_id, reqObj.position];
      const result = await client.query(query, values);
      const slide = result.rows[0];
      return slide;
    } finally {
      client.release();
    }
  }

  async updateSlideTitle(id: string, title: string): Promise<ISlide> {
    const client = await this.clientPool.connect();
    try {
      const query = `
      UPDATE TABLE slides
      SET title = $1
      WHERE id = $2;
      RETURNING *;
      `;
      const values = [title, id];
      const result = await client.query(query, values);
      const slide: ISlide = result.rows[0];
      return slide;
    } finally {
      client.release();
    }
  }

  async deleteSlide(deleteSlideId: string, updateSlideId?: string): Promise<void> {
    const client = await this.clientPool.connect();
    try {
      if (updateSlideId) {
        let query = `
        SELECT position FROM slides
        WHERE id = $1;
        `;
        const result = await client.query(query, [deleteSlideId]);
        const position: number = result.rows[0];
        query = `
        UPDATE TABLE slides
        SET position = $1
        WHERE id = $2;
        `;
        await client.query(query, [position, updateSlideId]);
      }
      const query = `
      DELETE FROM slides
      WHERE id = $1;
      `;
      await client.query(query, [deleteSlideId]);
    } finally {
      client.release();
    }
  }
}
