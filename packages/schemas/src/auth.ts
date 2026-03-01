import { z } from "zod";

// ===== ユーザー関連 =====
export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userIdGetPostsSchema = z.object({
  userId: z.string(),
});

export const UpdateProfileSchema = z.object({
  store: z.string()
})

// ===== Stores =====

// GET /stores/:id 用
export const getStoreSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number().int().positive({
    message: "id は正の整数である必要があります",
  })),
});

// POST /stores 用（作成）
export const createStoreSchema = z.object({
  name: z.string().min(1, "店舗名は必須です"),
  lat: z.preprocess(
    (val) => Number(val),
    z.number({ message: "緯度は必須かつ数値である必要があります" })
  ),
  lng: z.preprocess(
    (val) => Number(val),
    z.number({ message: "経度は必須かつ数値である必要があります" })
  ),
});

// PUT /stores 用（更新、部分更新可能）
export const updateStoreSchema = z
  .object({
    id: z.number().int().positive({ message: "id は正の整数である必要があります" }),
    name: z.string().min(1).optional(),
    lat: z.preprocess((val) => Number(val), z.number().optional()),
    lng: z.preprocess((val) => Number(val), z.number().optional()),
  })
  .refine(
    (data) => data.name !== undefined || data.lat !== undefined || data.lng !== undefined,
    { message: "少なくとも1つは更新項目が必要です" }
  );

// DELETE /stores 用
export const deleteStoreSchema = z.object({
  id: z.number().int().positive({ message: "id は正の整数である必要があります" }),
});

