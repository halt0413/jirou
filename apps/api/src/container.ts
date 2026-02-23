// src/container.ts
import { Env } from "./types/env";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./infra/db/schema";

import { D1PostsRepository } from "./infra/repository/d1_posts.repository";
import { CreatePostUseCase } from "./application/posts/create_post.usecase";

import { DrizzleUserRepository } from "./infra/repository/d1_user.repository";
import { BcryptPasswordHasher } from "./infra/auth/bcrypt_password_hasher";
import { HonoTokenProvider } from "./infra/auth/hono_token_provider";

import { RegisterUseCase } from "./application/users/register_user.usecase";
import { LoginUserUseCase } from "./application/users/login_user.usecase";

export const createContainer = (env: Env) => {
  const db = drizzle(env.DB, { schema });

  // ===== Posts =====
  const postRepository = new D1PostsRepository(db);

  // ===== Users =====
  const userRepository = new DrizzleUserRepository(db);
  const passwordHasher = new BcryptPasswordHasher();
  const tokenProvider = new HonoTokenProvider(env.JWT_SECRET);

  return {
    // posts
    createPostUseCase: new CreatePostUseCase(postRepository),

    // users
    registerUserUseCase: new RegisterUseCase(
      userRepository,
      passwordHasher
    ),
    loginUserUseCase: new LoginUserUseCase(
      userRepository,
      passwordHasher,
      tokenProvider
    ),
  };
};