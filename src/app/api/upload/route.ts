import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp ảnh tải lên' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Chuẩn bị đường dẫn thư mục lưu ảnh
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Tạo tên tệp an toàn
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `up_${Date.now()}_${safeName}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        filename,
      });
    } catch (fsErr) {
      // Nếu môi trường Vercel Read-Only, fallback sang Base64 Data URL
      console.warn('Filesystem write failed, fallback to base64 Data URL:', fsErr);
      const mime = file.type || 'image/jpeg';
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mime};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        isBase64: true,
      });
    }
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json({ error: error.message || 'Lỗi khi tải ảnh lên' }, { status: 500 });
  }
}
