/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model AuthProvider
 *
 */
export type AuthProvider = $Result.DefaultSelection<Prisma.$AuthProviderPayload>;
/**
 * Model Workout
 *
 */
export type Workout = $Result.DefaultSelection<Prisma.$WorkoutPayload>;
/**
 * Model Exercise
 *
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>;
/**
 * Model ExerciseSynonym
 *
 */
export type ExerciseSynonym = $Result.DefaultSelection<Prisma.$ExerciseSynonymPayload>;
/**
 * Model UserExerciseMapping
 *
 */
export type UserExerciseMapping = $Result.DefaultSelection<Prisma.$UserExerciseMappingPayload>;
/**
 * Model WorkoutExercise
 *
 */
export type WorkoutExercise = $Result.DefaultSelection<Prisma.$WorkoutExercisePayload>;
/**
 * Model ExerciseSet
 *
 */
export type ExerciseSet = $Result.DefaultSelection<Prisma.$ExerciseSetPayload>;
/**
 * Model WorkoutComment
 *
 */
export type WorkoutComment = $Result.DefaultSelection<Prisma.$WorkoutCommentPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const WorkoutStatus: {
    DRAFT: 'DRAFT';
    APPROVED: 'APPROVED';
    CANCELLED: 'CANCELLED';
  };

  export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus];

  export const ExerciseCategory: {
    COMPOUND: 'COMPOUND';
    ISOLATION: 'ISOLATION';
    CARDIO: 'CARDIO';
  };

  export type ExerciseCategory = (typeof ExerciseCategory)[keyof typeof ExerciseCategory];

  export const WeightUnit: {
    KG: 'KG';
    LB: 'LB';
  };

  export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];

  export const CommentType: {
    TECHNIQUE: 'TECHNIQUE';
    SENSATION: 'SENSATION';
    ASYMMETRY: 'ASYMMETRY';
    OTHER: 'OTHER';
  };

  export type CommentType = (typeof CommentType)[keyof typeof CommentType];

  export const BodySide: {
    LEFT: 'LEFT';
    RIGHT: 'RIGHT';
    BOTH: 'BOTH';
  };

  export type BodySide = (typeof BodySide)[keyof typeof BodySide];

  export const SensationType: {
    PAIN: 'PAIN';
    TENSION: 'TENSION';
    BURN: 'BURN';
  };

  export type SensationType = (typeof SensationType)[keyof typeof SensationType];
}

export type WorkoutStatus = $Enums.WorkoutStatus;

export const WorkoutStatus: typeof $Enums.WorkoutStatus;

export type ExerciseCategory = $Enums.ExerciseCategory;

export const ExerciseCategory: typeof $Enums.ExerciseCategory;

export type WeightUnit = $Enums.WeightUnit;

export const WeightUnit: typeof $Enums.WeightUnit;

export type CommentType = $Enums.CommentType;

export const CommentType: typeof $Enums.CommentType;

export type BodySide = $Enums.BodySide;

export const BodySide: typeof $Enums.BodySide;

export type SensationType = $Enums.SensationType;

export const SensationType: typeof $Enums.SensationType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authProvider`: Exposes CRUD operations for the **AuthProvider** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more AuthProviders
   * const authProviders = await prisma.authProvider.findMany()
   * ```
   */
  get authProvider(): Prisma.AuthProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workout`: Exposes CRUD operations for the **Workout** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Workouts
   * const workouts = await prisma.workout.findMany()
   * ```
   */
  get workout(): Prisma.WorkoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Exercises
   * const exercises = await prisma.exercise.findMany()
   * ```
   */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciseSynonym`: Exposes CRUD operations for the **ExerciseSynonym** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ExerciseSynonyms
   * const exerciseSynonyms = await prisma.exerciseSynonym.findMany()
   * ```
   */
  get exerciseSynonym(): Prisma.ExerciseSynonymDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userExerciseMapping`: Exposes CRUD operations for the **UserExerciseMapping** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserExerciseMappings
   * const userExerciseMappings = await prisma.userExerciseMapping.findMany()
   * ```
   */
  get userExerciseMapping(): Prisma.UserExerciseMappingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutExercise`: Exposes CRUD operations for the **WorkoutExercise** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WorkoutExercises
   * const workoutExercises = await prisma.workoutExercise.findMany()
   * ```
   */
  get workoutExercise(): Prisma.WorkoutExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exerciseSet`: Exposes CRUD operations for the **ExerciseSet** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ExerciseSets
   * const exerciseSets = await prisma.exerciseSet.findMany()
   * ```
   */
  get exerciseSet(): Prisma.ExerciseSetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workoutComment`: Exposes CRUD operations for the **WorkoutComment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WorkoutComments
   * const workoutComments = await prisma.workoutComment.findMany()
   * ```
   */
  get workoutComment(): Prisma.WorkoutCommentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    AuthProvider: 'AuthProvider';
    Workout: 'Workout';
    Exercise: 'Exercise';
    ExerciseSynonym: 'ExerciseSynonym';
    UserExerciseMapping: 'UserExerciseMapping';
    WorkoutExercise: 'WorkoutExercise';
    ExerciseSet: 'ExerciseSet';
    WorkoutComment: 'WorkoutComment';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'user'
        | 'authProvider'
        | 'workout'
        | 'exercise'
        | 'exerciseSynonym'
        | 'userExerciseMapping'
        | 'workoutExercise'
        | 'exerciseSet'
        | 'workoutComment';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      AuthProvider: {
        payload: Prisma.$AuthProviderPayload<ExtArgs>;
        fields: Prisma.AuthProviderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AuthProviderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AuthProviderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          findFirst: {
            args: Prisma.AuthProviderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AuthProviderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          findMany: {
            args: Prisma.AuthProviderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[];
          };
          create: {
            args: Prisma.AuthProviderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          createMany: {
            args: Prisma.AuthProviderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AuthProviderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[];
          };
          delete: {
            args: Prisma.AuthProviderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          update: {
            args: Prisma.AuthProviderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          deleteMany: {
            args: Prisma.AuthProviderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AuthProviderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AuthProviderUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[];
          };
          upsert: {
            args: Prisma.AuthProviderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>;
          };
          aggregate: {
            args: Prisma.AuthProviderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAuthProvider>;
          };
          groupBy: {
            args: Prisma.AuthProviderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AuthProviderGroupByOutputType>[];
          };
          count: {
            args: Prisma.AuthProviderCountArgs<ExtArgs>;
            result: $Utils.Optional<AuthProviderCountAggregateOutputType> | number;
          };
        };
      };
      Workout: {
        payload: Prisma.$WorkoutPayload<ExtArgs>;
        fields: Prisma.WorkoutFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WorkoutFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WorkoutFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          findFirst: {
            args: Prisma.WorkoutFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WorkoutFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          findMany: {
            args: Prisma.WorkoutFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[];
          };
          create: {
            args: Prisma.WorkoutCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          createMany: {
            args: Prisma.WorkoutCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WorkoutCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[];
          };
          delete: {
            args: Prisma.WorkoutDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          update: {
            args: Prisma.WorkoutUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          deleteMany: {
            args: Prisma.WorkoutDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WorkoutUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WorkoutUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>[];
          };
          upsert: {
            args: Prisma.WorkoutUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutPayload>;
          };
          aggregate: {
            args: Prisma.WorkoutAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWorkout>;
          };
          groupBy: {
            args: Prisma.WorkoutGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutGroupByOutputType>[];
          };
          count: {
            args: Prisma.WorkoutCountArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutCountAggregateOutputType> | number;
          };
        };
      };
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>;
        fields: Prisma.ExerciseFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[];
          };
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[];
          };
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[];
          };
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>;
          };
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateExercise>;
          };
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseGroupByOutputType>[];
          };
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number;
          };
        };
      };
      ExerciseSynonym: {
        payload: Prisma.$ExerciseSynonymPayload<ExtArgs>;
        fields: Prisma.ExerciseSynonymFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ExerciseSynonymFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ExerciseSynonymFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          findFirst: {
            args: Prisma.ExerciseSynonymFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ExerciseSynonymFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          findMany: {
            args: Prisma.ExerciseSynonymFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>[];
          };
          create: {
            args: Prisma.ExerciseSynonymCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          createMany: {
            args: Prisma.ExerciseSynonymCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ExerciseSynonymCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>[];
          };
          delete: {
            args: Prisma.ExerciseSynonymDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          update: {
            args: Prisma.ExerciseSynonymUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          deleteMany: {
            args: Prisma.ExerciseSynonymDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ExerciseSynonymUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ExerciseSynonymUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>[];
          };
          upsert: {
            args: Prisma.ExerciseSynonymUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSynonymPayload>;
          };
          aggregate: {
            args: Prisma.ExerciseSynonymAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateExerciseSynonym>;
          };
          groupBy: {
            args: Prisma.ExerciseSynonymGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseSynonymGroupByOutputType>[];
          };
          count: {
            args: Prisma.ExerciseSynonymCountArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseSynonymCountAggregateOutputType> | number;
          };
        };
      };
      UserExerciseMapping: {
        payload: Prisma.$UserExerciseMappingPayload<ExtArgs>;
        fields: Prisma.UserExerciseMappingFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserExerciseMappingFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserExerciseMappingFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          findFirst: {
            args: Prisma.UserExerciseMappingFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserExerciseMappingFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          findMany: {
            args: Prisma.UserExerciseMappingFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>[];
          };
          create: {
            args: Prisma.UserExerciseMappingCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          createMany: {
            args: Prisma.UserExerciseMappingCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserExerciseMappingCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>[];
          };
          delete: {
            args: Prisma.UserExerciseMappingDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          update: {
            args: Prisma.UserExerciseMappingUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          deleteMany: {
            args: Prisma.UserExerciseMappingDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserExerciseMappingUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserExerciseMappingUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>[];
          };
          upsert: {
            args: Prisma.UserExerciseMappingUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserExerciseMappingPayload>;
          };
          aggregate: {
            args: Prisma.UserExerciseMappingAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserExerciseMapping>;
          };
          groupBy: {
            args: Prisma.UserExerciseMappingGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserExerciseMappingGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserExerciseMappingCountArgs<ExtArgs>;
            result: $Utils.Optional<UserExerciseMappingCountAggregateOutputType> | number;
          };
        };
      };
      WorkoutExercise: {
        payload: Prisma.$WorkoutExercisePayload<ExtArgs>;
        fields: Prisma.WorkoutExerciseFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WorkoutExerciseFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          findFirst: {
            args: Prisma.WorkoutExerciseFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WorkoutExerciseFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          findMany: {
            args: Prisma.WorkoutExerciseFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[];
          };
          create: {
            args: Prisma.WorkoutExerciseCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          createMany: {
            args: Prisma.WorkoutExerciseCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WorkoutExerciseCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[];
          };
          delete: {
            args: Prisma.WorkoutExerciseDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          update: {
            args: Prisma.WorkoutExerciseUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          deleteMany: {
            args: Prisma.WorkoutExerciseDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WorkoutExerciseUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>[];
          };
          upsert: {
            args: Prisma.WorkoutExerciseUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutExercisePayload>;
          };
          aggregate: {
            args: Prisma.WorkoutExerciseAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWorkoutExercise>;
          };
          groupBy: {
            args: Prisma.WorkoutExerciseGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutExerciseGroupByOutputType>[];
          };
          count: {
            args: Prisma.WorkoutExerciseCountArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutExerciseCountAggregateOutputType> | number;
          };
        };
      };
      ExerciseSet: {
        payload: Prisma.$ExerciseSetPayload<ExtArgs>;
        fields: Prisma.ExerciseSetFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ExerciseSetFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ExerciseSetFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          findFirst: {
            args: Prisma.ExerciseSetFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ExerciseSetFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          findMany: {
            args: Prisma.ExerciseSetFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>[];
          };
          create: {
            args: Prisma.ExerciseSetCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          createMany: {
            args: Prisma.ExerciseSetCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ExerciseSetCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>[];
          };
          delete: {
            args: Prisma.ExerciseSetDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          update: {
            args: Prisma.ExerciseSetUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          deleteMany: {
            args: Prisma.ExerciseSetDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ExerciseSetUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ExerciseSetUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>[];
          };
          upsert: {
            args: Prisma.ExerciseSetUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ExerciseSetPayload>;
          };
          aggregate: {
            args: Prisma.ExerciseSetAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateExerciseSet>;
          };
          groupBy: {
            args: Prisma.ExerciseSetGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseSetGroupByOutputType>[];
          };
          count: {
            args: Prisma.ExerciseSetCountArgs<ExtArgs>;
            result: $Utils.Optional<ExerciseSetCountAggregateOutputType> | number;
          };
        };
      };
      WorkoutComment: {
        payload: Prisma.$WorkoutCommentPayload<ExtArgs>;
        fields: Prisma.WorkoutCommentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WorkoutCommentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WorkoutCommentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          findFirst: {
            args: Prisma.WorkoutCommentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WorkoutCommentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          findMany: {
            args: Prisma.WorkoutCommentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>[];
          };
          create: {
            args: Prisma.WorkoutCommentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          createMany: {
            args: Prisma.WorkoutCommentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WorkoutCommentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>[];
          };
          delete: {
            args: Prisma.WorkoutCommentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          update: {
            args: Prisma.WorkoutCommentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          deleteMany: {
            args: Prisma.WorkoutCommentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WorkoutCommentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WorkoutCommentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>[];
          };
          upsert: {
            args: Prisma.WorkoutCommentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WorkoutCommentPayload>;
          };
          aggregate: {
            args: Prisma.WorkoutCommentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWorkoutComment>;
          };
          groupBy: {
            args: Prisma.WorkoutCommentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutCommentGroupByOutputType>[];
          };
          count: {
            args: Prisma.WorkoutCommentCountArgs<ExtArgs>;
            result: $Utils.Optional<WorkoutCommentCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    authProvider?: AuthProviderOmit;
    workout?: WorkoutOmit;
    exercise?: ExerciseOmit;
    exerciseSynonym?: ExerciseSynonymOmit;
    userExerciseMapping?: UserExerciseMappingOmit;
    workoutExercise?: WorkoutExerciseOmit;
    exerciseSet?: ExerciseSetOmit;
    workoutComment?: WorkoutCommentOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    authProviders: number;
    workouts: number;
    exerciseMappings: number;
    createdExercises: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    authProviders?: boolean | UserCountOutputTypeCountAuthProvidersArgs;
    workouts?: boolean | UserCountOutputTypeCountWorkoutsArgs;
    exerciseMappings?: boolean | UserCountOutputTypeCountExerciseMappingsArgs;
    createdExercises?: boolean | UserCountOutputTypeCountCreatedExercisesArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthProvidersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuthProviderWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkoutsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExerciseMappingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserExerciseMappingWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseWhereInput;
  };

  /**
   * Count Type WorkoutCountOutputType
   */

  export type WorkoutCountOutputType = {
    workoutExercises: number;
    comments: number;
  };

  export type WorkoutCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workoutExercises?: boolean | WorkoutCountOutputTypeCountWorkoutExercisesArgs;
    comments?: boolean | WorkoutCountOutputTypeCountCommentsArgs;
  };

  // Custom InputTypes
  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutCountOutputType
     */
    select?: WorkoutCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountWorkoutExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutExerciseWhereInput;
  };

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeCountCommentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutCommentWhereInput;
  };

  /**
   * Count Type ExerciseCountOutputType
   */

  export type ExerciseCountOutputType = {
    synonyms: number;
    workoutExercises: number;
    userMappings: number;
  };

  export type ExerciseCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    synonyms?: boolean | ExerciseCountOutputTypeCountSynonymsArgs;
    workoutExercises?: boolean | ExerciseCountOutputTypeCountWorkoutExercisesArgs;
    userMappings?: boolean | ExerciseCountOutputTypeCountUserMappingsArgs;
  };

  // Custom InputTypes
  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseCountOutputType
     */
    select?: ExerciseCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountSynonymsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseSynonymWhereInput;
  };

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountWorkoutExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutExerciseWhereInput;
  };

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountUserMappingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserExerciseMappingWhereInput;
  };

  /**
   * Count Type WorkoutExerciseCountOutputType
   */

  export type WorkoutExerciseCountOutputType = {
    sets: number;
    comments: number;
  };

  export type WorkoutExerciseCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sets?: boolean | WorkoutExerciseCountOutputTypeCountSetsArgs;
    comments?: boolean | WorkoutExerciseCountOutputTypeCountCommentsArgs;
  };

  // Custom InputTypes
  /**
   * WorkoutExerciseCountOutputType without action
   */
  export type WorkoutExerciseCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExerciseCountOutputType
     */
    select?: WorkoutExerciseCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * WorkoutExerciseCountOutputType without action
   */
  export type WorkoutExerciseCountOutputTypeCountSetsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseSetWhereInput;
  };

  /**
   * WorkoutExerciseCountOutputType without action
   */
  export type WorkoutExerciseCountOutputTypeCountCommentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutCommentWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    telegramId: string | null;
    telegramUsername: string | null;
    email: string | null;
    passwordHash: string | null;
    displayName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    telegramId: string | null;
    telegramUsername: string | null;
    email: string | null;
    passwordHash: string | null;
    displayName: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    telegramId: number;
    telegramUsername: number;
    email: number;
    passwordHash: number;
    displayName: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    telegramId?: true;
    telegramUsername?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    telegramId?: true;
    telegramUsername?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    telegramId?: true;
    telegramUsername?: true;
    email?: true;
    passwordHash?: true;
    displayName?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    telegramId: string | null;
    telegramUsername: string | null;
    email: string | null;
    passwordHash: string | null;
    displayName: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        telegramId?: boolean;
        telegramUsername?: boolean;
        email?: boolean;
        passwordHash?: boolean;
        displayName?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        authProviders?: boolean | User$authProvidersArgs<ExtArgs>;
        workouts?: boolean | User$workoutsArgs<ExtArgs>;
        exerciseMappings?: boolean | User$exerciseMappingsArgs<ExtArgs>;
        createdExercises?: boolean | User$createdExercisesArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      telegramId?: boolean;
      telegramUsername?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      displayName?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      telegramId?: boolean;
      telegramUsername?: boolean;
      email?: boolean;
      passwordHash?: boolean;
      displayName?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    telegramId?: boolean;
    telegramUsername?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    displayName?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'telegramId'
      | 'telegramUsername'
      | 'email'
      | 'passwordHash'
      | 'displayName'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['user']
    >;
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authProviders?: boolean | User$authProvidersArgs<ExtArgs>;
    workouts?: boolean | User$workoutsArgs<ExtArgs>;
    exerciseMappings?: boolean | User$exerciseMappingsArgs<ExtArgs>;
    createdExercises?: boolean | User$createdExercisesArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {
      authProviders: Prisma.$AuthProviderPayload<ExtArgs>[];
      workouts: Prisma.$WorkoutPayload<ExtArgs>[];
      exerciseMappings: Prisma.$UserExerciseMappingPayload<ExtArgs>[];
      createdExercises: Prisma.$ExercisePayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        telegramId: string | null;
        telegramUsername: string | null;
        email: string | null;
        passwordHash: string | null;
        displayName: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    authProviders<T extends User$authProvidersArgs<ExtArgs> = {}>(
      args?: Subset<T, User$authProvidersArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    workouts<T extends User$workoutsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$workoutsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    exerciseMappings<T extends User$exerciseMappingsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$exerciseMappingsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserExerciseMappingPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    createdExercises<T extends User$createdExercisesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$createdExercisesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly telegramId: FieldRef<'User', 'String'>;
    readonly telegramUsername: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly passwordHash: FieldRef<'User', 'String'>;
    readonly displayName: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.authProviders
   */
  export type User$authProvidersArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    where?: AuthProviderWhereInput;
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[];
    cursor?: AuthProviderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[];
  };

  /**
   * User.workouts
   */
  export type User$workoutsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    where?: WorkoutWhereInput;
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[];
    cursor?: WorkoutWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[];
  };

  /**
   * User.exerciseMappings
   */
  export type User$exerciseMappingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    where?: UserExerciseMappingWhereInput;
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    cursor?: UserExerciseMappingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserExerciseMappingScalarFieldEnum | UserExerciseMappingScalarFieldEnum[];
  };

  /**
   * User.createdExercises
   */
  export type User$createdExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    where?: ExerciseWhereInput;
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[];
    cursor?: ExerciseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
    };

  /**
   * Model AuthProvider
   */

  export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null;
    _min: AuthProviderMinAggregateOutputType | null;
    _max: AuthProviderMaxAggregateOutputType | null;
  };

  export type AuthProviderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    providerUserId: string | null;
    createdAt: Date | null;
  };

  export type AuthProviderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    provider: string | null;
    providerUserId: string | null;
    createdAt: Date | null;
  };

  export type AuthProviderCountAggregateOutputType = {
    id: number;
    userId: number;
    provider: number;
    providerUserId: number;
    metadata: number;
    createdAt: number;
    _all: number;
  };

  export type AuthProviderMinAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    createdAt?: true;
  };

  export type AuthProviderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    createdAt?: true;
  };

  export type AuthProviderCountAggregateInputType = {
    id?: true;
    userId?: true;
    provider?: true;
    providerUserId?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
  };

  export type AuthProviderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuthProvider to aggregate.
     */
    where?: AuthProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AuthProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuthProviders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AuthProviders
     **/
    _count?: true | AuthProviderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AuthProviderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AuthProviderMaxAggregateInputType;
  };

  export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
    [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthProvider[P]>
      : GetScalarType<T[P], AggregateAuthProvider[P]>;
  };

  export type AuthProviderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AuthProviderWhereInput;
    orderBy?: AuthProviderOrderByWithAggregationInput | AuthProviderOrderByWithAggregationInput[];
    by: AuthProviderScalarFieldEnum[] | AuthProviderScalarFieldEnum;
    having?: AuthProviderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuthProviderCountAggregateInputType | true;
    _min?: AuthProviderMinAggregateInputType;
    _max?: AuthProviderMaxAggregateInputType;
  };

  export type AuthProviderGroupByOutputType = {
    id: string;
    userId: string;
    provider: string;
    providerUserId: string;
    metadata: JsonValue | null;
    createdAt: Date;
    _count: AuthProviderCountAggregateOutputType | null;
    _min: AuthProviderMinAggregateOutputType | null;
    _max: AuthProviderMaxAggregateOutputType | null;
  };

  type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthProviderGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AuthProviderGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
          : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>;
      }
    >
  >;

  export type AuthProviderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      provider?: boolean;
      providerUserId?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['authProvider']
  >;

  export type AuthProviderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      provider?: boolean;
      providerUserId?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['authProvider']
  >;

  export type AuthProviderSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      provider?: boolean;
      providerUserId?: boolean;
      metadata?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['authProvider']
  >;

  export type AuthProviderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
  };

  export type AuthProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'userId' | 'provider' | 'providerUserId' | 'metadata' | 'createdAt',
      ExtArgs['result']['authProvider']
    >;
  export type AuthProviderInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AuthProviderIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AuthProviderIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AuthProviderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'AuthProvider';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        provider: string;
        providerUserId: string;
        metadata: Prisma.JsonValue | null;
        createdAt: Date;
      },
      ExtArgs['result']['authProvider']
    >;
    composites: {};
  };

  type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> =
    $Result.GetResult<Prisma.$AuthProviderPayload, S>;

  type AuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthProviderCountAggregateInputType | true;
    };

  export interface AuthProviderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'];
      meta: { name: 'AuthProvider' };
    };
    /**
     * Find zero or one AuthProvider that matches the filter.
     * @param {AuthProviderFindUniqueArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthProviderFindUniqueArgs>(
      args: SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one AuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthProviderFindUniqueOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthProviderFindFirstArgs>(
      args?: SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more AuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthProviders
     * const authProviders = await prisma.authProvider.findMany()
     *
     * // Get first 10 AuthProviders
     * const authProviders = await prisma.authProvider.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AuthProviderFindManyArgs>(
      args?: SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a AuthProvider.
     * @param {AuthProviderCreateArgs} args - Arguments to create a AuthProvider.
     * @example
     * // Create one AuthProvider
     * const AuthProvider = await prisma.authProvider.create({
     *   data: {
     *     // ... data to create a AuthProvider
     *   }
     * })
     *
     */
    create<T extends AuthProviderCreateArgs>(
      args: SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many AuthProviders.
     * @param {AuthProviderCreateManyArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AuthProviderCreateManyArgs>(
      args?: SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many AuthProviders and returns the data saved in the database.
     * @param {AuthProviderCreateManyAndReturnArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a AuthProvider.
     * @param {AuthProviderDeleteArgs} args - Arguments to delete one AuthProvider.
     * @example
     * // Delete one AuthProvider
     * const AuthProvider = await prisma.authProvider.delete({
     *   where: {
     *     // ... filter to delete one AuthProvider
     *   }
     * })
     *
     */
    delete<T extends AuthProviderDeleteArgs>(
      args: SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one AuthProvider.
     * @param {AuthProviderUpdateArgs} args - Arguments to update one AuthProvider.
     * @example
     * // Update one AuthProvider
     * const authProvider = await prisma.authProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AuthProviderUpdateArgs>(
      args: SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more AuthProviders.
     * @param {AuthProviderDeleteManyArgs} args - Arguments to filter AuthProviders to delete.
     * @example
     * // Delete a few AuthProviders
     * const { count } = await prisma.authProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AuthProviderDeleteManyArgs>(
      args?: SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AuthProviderUpdateManyArgs>(
      args: SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AuthProviders and returns the data updated in the database.
     * @param {AuthProviderUpdateManyAndReturnArgs} args - Arguments to update many AuthProviders.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AuthProviderPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one AuthProvider.
     * @param {AuthProviderUpsertArgs} args - Arguments to update or create a AuthProvider.
     * @example
     * // Update or create a AuthProvider
     * const authProvider = await prisma.authProvider.upsert({
     *   create: {
     *     // ... data to create a AuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends AuthProviderUpsertArgs>(
      args: SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>,
    ): Prisma__AuthProviderClient<
      $Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderCountArgs} args - Arguments to filter AuthProviders to count.
     * @example
     * // Count the number of AuthProviders
     * const count = await prisma.authProvider.count({
     *   where: {
     *     // ... the filter for the AuthProviders we want to count
     *   }
     * })
     **/
    count<T extends AuthProviderCountArgs>(
      args?: Subset<T, AuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthProviderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AuthProviderAggregateArgs>(
      args: Subset<T, AuthProviderAggregateArgs>,
    ): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>;

    /**
     * Group by AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AuthProviderGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: AuthProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAuthProviderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AuthProvider model
     */
    readonly fields: AuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthProviderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the AuthProvider model
   */
  interface AuthProviderFieldRefs {
    readonly id: FieldRef<'AuthProvider', 'String'>;
    readonly userId: FieldRef<'AuthProvider', 'String'>;
    readonly provider: FieldRef<'AuthProvider', 'String'>;
    readonly providerUserId: FieldRef<'AuthProvider', 'String'>;
    readonly metadata: FieldRef<'AuthProvider', 'Json'>;
    readonly createdAt: FieldRef<'AuthProvider', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * AuthProvider findUnique
   */
  export type AuthProviderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput;
  };

  /**
   * AuthProvider findUniqueOrThrow
   */
  export type AuthProviderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput;
  };

  /**
   * AuthProvider findFirst
   */
  export type AuthProviderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuthProviders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[];
  };

  /**
   * AuthProvider findFirstOrThrow
   */
  export type AuthProviderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuthProviders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[];
  };

  /**
   * AuthProvider findMany
   */
  export type AuthProviderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter, which AuthProviders to fetch.
     */
    where?: AuthProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AuthProviders.
     */
    skip?: number;
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[];
  };

  /**
   * AuthProvider create
   */
  export type AuthProviderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * The data needed to create a AuthProvider.
     */
    data: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>;
  };

  /**
   * AuthProvider createMany
   */
  export type AuthProviderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AuthProvider createManyAndReturn
   */
  export type AuthProviderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AuthProvider update
   */
  export type AuthProviderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * The data needed to update a AuthProvider.
     */
    data: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>;
    /**
     * Choose, which AuthProvider to update.
     */
    where: AuthProviderWhereUniqueInput;
  };

  /**
   * AuthProvider updateMany
   */
  export type AuthProviderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>;
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput;
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number;
  };

  /**
   * AuthProvider updateManyAndReturn
   */
  export type AuthProviderUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>;
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput;
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AuthProvider upsert
   */
  export type AuthProviderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * The filter to search for the AuthProvider to update in case it exists.
     */
    where: AuthProviderWhereUniqueInput;
    /**
     * In case the AuthProvider found by the `where` argument doesn't exist, create a new AuthProvider with this data.
     */
    create: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>;
    /**
     * In case the AuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>;
  };

  /**
   * AuthProvider delete
   */
  export type AuthProviderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
    /**
     * Filter which AuthProvider to delete.
     */
    where: AuthProviderWhereUniqueInput;
  };

  /**
   * AuthProvider deleteMany
   */
  export type AuthProviderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which AuthProviders to delete
     */
    where?: AuthProviderWhereInput;
    /**
     * Limit how many AuthProviders to delete.
     */
    limit?: number;
  };

  /**
   * AuthProvider without action
   */
  export type AuthProviderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null;
  };

  /**
   * Model Workout
   */

  export type AggregateWorkout = {
    _count: WorkoutCountAggregateOutputType | null;
    _avg: WorkoutAvgAggregateOutputType | null;
    _sum: WorkoutSumAggregateOutputType | null;
    _min: WorkoutMinAggregateOutputType | null;
    _max: WorkoutMaxAggregateOutputType | null;
  };

  export type WorkoutAvgAggregateOutputType = {
    sourceMessageId: number | null;
    previewMessageId: number | null;
    publishedMessageId: number | null;
  };

  export type WorkoutSumAggregateOutputType = {
    sourceMessageId: number | null;
    previewMessageId: number | null;
    publishedMessageId: number | null;
  };

  export type WorkoutMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    workoutDate: Date | null;
    status: $Enums.WorkoutStatus | null;
    location: string | null;
    comment: string | null;
    rawTranscript: string | null;
    sourceMessageId: number | null;
    previewMessageId: number | null;
    publishedMessageId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WorkoutMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    workoutDate: Date | null;
    status: $Enums.WorkoutStatus | null;
    location: string | null;
    comment: string | null;
    rawTranscript: string | null;
    sourceMessageId: number | null;
    previewMessageId: number | null;
    publishedMessageId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WorkoutCountAggregateOutputType = {
    id: number;
    userId: number;
    workoutDate: number;
    status: number;
    focus: number;
    location: number;
    comment: number;
    rawTranscript: number;
    sourceMessageId: number;
    previewMessageId: number;
    publishedMessageId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type WorkoutAvgAggregateInputType = {
    sourceMessageId?: true;
    previewMessageId?: true;
    publishedMessageId?: true;
  };

  export type WorkoutSumAggregateInputType = {
    sourceMessageId?: true;
    previewMessageId?: true;
    publishedMessageId?: true;
  };

  export type WorkoutMinAggregateInputType = {
    id?: true;
    userId?: true;
    workoutDate?: true;
    status?: true;
    location?: true;
    comment?: true;
    rawTranscript?: true;
    sourceMessageId?: true;
    previewMessageId?: true;
    publishedMessageId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WorkoutMaxAggregateInputType = {
    id?: true;
    userId?: true;
    workoutDate?: true;
    status?: true;
    location?: true;
    comment?: true;
    rawTranscript?: true;
    sourceMessageId?: true;
    previewMessageId?: true;
    publishedMessageId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WorkoutCountAggregateInputType = {
    id?: true;
    userId?: true;
    workoutDate?: true;
    status?: true;
    focus?: true;
    location?: true;
    comment?: true;
    rawTranscript?: true;
    sourceMessageId?: true;
    previewMessageId?: true;
    publishedMessageId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type WorkoutAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Workout to aggregate.
     */
    where?: WorkoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WorkoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Workouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Workouts
     **/
    _count?: true | WorkoutCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: WorkoutAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: WorkoutSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WorkoutMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WorkoutMaxAggregateInputType;
  };

  export type GetWorkoutAggregateType<T extends WorkoutAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout[P]>
      : GetScalarType<T[P], AggregateWorkout[P]>;
  };

  export type WorkoutGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutWhereInput;
    orderBy?: WorkoutOrderByWithAggregationInput | WorkoutOrderByWithAggregationInput[];
    by: WorkoutScalarFieldEnum[] | WorkoutScalarFieldEnum;
    having?: WorkoutScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkoutCountAggregateInputType | true;
    _avg?: WorkoutAvgAggregateInputType;
    _sum?: WorkoutSumAggregateInputType;
    _min?: WorkoutMinAggregateInputType;
    _max?: WorkoutMaxAggregateInputType;
  };

  export type WorkoutGroupByOutputType = {
    id: string;
    userId: string;
    workoutDate: Date;
    status: $Enums.WorkoutStatus;
    focus: string[];
    location: string | null;
    comment: string | null;
    rawTranscript: string | null;
    sourceMessageId: number | null;
    previewMessageId: number | null;
    publishedMessageId: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkoutCountAggregateOutputType | null;
    _avg: WorkoutAvgAggregateOutputType | null;
    _sum: WorkoutSumAggregateOutputType | null;
    _min: WorkoutMinAggregateOutputType | null;
    _max: WorkoutMaxAggregateOutputType | null;
  };

  type GetWorkoutGroupByPayload<T extends WorkoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutGroupByOutputType, T['by']> & {
        [P in keyof T & keyof WorkoutGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
          : GetScalarType<T[P], WorkoutGroupByOutputType[P]>;
      }
    >
  >;

  export type WorkoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        userId?: boolean;
        workoutDate?: boolean;
        status?: boolean;
        focus?: boolean;
        location?: boolean;
        comment?: boolean;
        rawTranscript?: boolean;
        sourceMessageId?: boolean;
        previewMessageId?: boolean;
        publishedMessageId?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        workoutExercises?: boolean | Workout$workoutExercisesArgs<ExtArgs>;
        comments?: boolean | Workout$commentsArgs<ExtArgs>;
        _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['workout']
    >;

  export type WorkoutSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      workoutDate?: boolean;
      status?: boolean;
      focus?: boolean;
      location?: boolean;
      comment?: boolean;
      rawTranscript?: boolean;
      sourceMessageId?: boolean;
      previewMessageId?: boolean;
      publishedMessageId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['workout']
  >;

  export type WorkoutSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      workoutDate?: boolean;
      status?: boolean;
      focus?: boolean;
      location?: boolean;
      comment?: boolean;
      rawTranscript?: boolean;
      sourceMessageId?: boolean;
      previewMessageId?: boolean;
      publishedMessageId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['workout']
  >;

  export type WorkoutSelectScalar = {
    id?: boolean;
    userId?: boolean;
    workoutDate?: boolean;
    status?: boolean;
    focus?: boolean;
    location?: boolean;
    comment?: boolean;
    rawTranscript?: boolean;
    sourceMessageId?: boolean;
    previewMessageId?: boolean;
    publishedMessageId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type WorkoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'userId'
      | 'workoutDate'
      | 'status'
      | 'focus'
      | 'location'
      | 'comment'
      | 'rawTranscript'
      | 'sourceMessageId'
      | 'previewMessageId'
      | 'publishedMessageId'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['workout']
    >;
  export type WorkoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    workoutExercises?: boolean | Workout$workoutExercisesArgs<ExtArgs>;
    comments?: boolean | Workout$commentsArgs<ExtArgs>;
    _count?: boolean | WorkoutCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type WorkoutIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type WorkoutIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $WorkoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Workout';
      objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        workoutExercises: Prisma.$WorkoutExercisePayload<ExtArgs>[];
        comments: Prisma.$WorkoutCommentPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          userId: string;
          workoutDate: Date;
          status: $Enums.WorkoutStatus;
          focus: string[];
          location: string | null;
          comment: string | null;
          rawTranscript: string | null;
          sourceMessageId: number | null;
          previewMessageId: number | null;
          publishedMessageId: number | null;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['workout']
      >;
      composites: {};
    };

  type WorkoutGetPayload<S extends boolean | null | undefined | WorkoutDefaultArgs> =
    $Result.GetResult<Prisma.$WorkoutPayload, S>;

  type WorkoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    WorkoutFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: WorkoutCountAggregateInputType | true;
  };

  export interface WorkoutDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workout']; meta: { name: 'Workout' } };
    /**
     * Find zero or one Workout that matches the filter.
     * @param {WorkoutFindUniqueArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutFindUniqueArgs>(
      args: SelectSubset<T, WorkoutFindUniqueArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Workout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutFindUniqueOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WorkoutFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Workout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutFindFirstArgs>(
      args?: SelectSubset<T, WorkoutFindFirstArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Workout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindFirstOrThrowArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkoutFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Workouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workouts
     * const workouts = await prisma.workout.findMany()
     *
     * // Get first 10 Workouts
     * const workouts = await prisma.workout.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workoutWithIdOnly = await prisma.workout.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkoutFindManyArgs>(
      args?: SelectSubset<T, WorkoutFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Workout.
     * @param {WorkoutCreateArgs} args - Arguments to create a Workout.
     * @example
     * // Create one Workout
     * const Workout = await prisma.workout.create({
     *   data: {
     *     // ... data to create a Workout
     *   }
     * })
     *
     */
    create<T extends WorkoutCreateArgs>(
      args: SelectSubset<T, WorkoutCreateArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Workouts.
     * @param {WorkoutCreateManyArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkoutCreateManyArgs>(
      args?: SelectSubset<T, WorkoutCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Workouts and returns the data saved in the database.
     * @param {WorkoutCreateManyAndReturnArgs} args - Arguments to create many Workouts.
     * @example
     * // Create many Workouts
     * const workout = await prisma.workout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkoutCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WorkoutCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Workout.
     * @param {WorkoutDeleteArgs} args - Arguments to delete one Workout.
     * @example
     * // Delete one Workout
     * const Workout = await prisma.workout.delete({
     *   where: {
     *     // ... filter to delete one Workout
     *   }
     * })
     *
     */
    delete<T extends WorkoutDeleteArgs>(
      args: SelectSubset<T, WorkoutDeleteArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Workout.
     * @param {WorkoutUpdateArgs} args - Arguments to update one Workout.
     * @example
     * // Update one Workout
     * const workout = await prisma.workout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkoutUpdateArgs>(
      args: SelectSubset<T, WorkoutUpdateArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Workouts.
     * @param {WorkoutDeleteManyArgs} args - Arguments to filter Workouts to delete.
     * @example
     * // Delete a few Workouts
     * const { count } = await prisma.workout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkoutDeleteManyArgs>(
      args?: SelectSubset<T, WorkoutDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkoutUpdateManyArgs>(
      args: SelectSubset<T, WorkoutUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Workouts and returns the data updated in the database.
     * @param {WorkoutUpdateManyAndReturnArgs} args - Arguments to update many Workouts.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Workouts and only return the `id`
     * const workoutWithIdOnly = await prisma.workout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WorkoutUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WorkoutUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Workout.
     * @param {WorkoutUpsertArgs} args - Arguments to update or create a Workout.
     * @example
     * // Update or create a Workout
     * const workout = await prisma.workout.upsert({
     *   create: {
     *     // ... data to create a Workout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutUpsertArgs>(
      args: SelectSubset<T, WorkoutUpsertArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      $Result.GetResult<Prisma.$WorkoutPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCountArgs} args - Arguments to filter Workouts to count.
     * @example
     * // Count the number of Workouts
     * const count = await prisma.workout.count({
     *   where: {
     *     // ... the filter for the Workouts we want to count
     *   }
     * })
     **/
    count<T extends WorkoutCountArgs>(
      args?: Subset<T, WorkoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WorkoutAggregateArgs>(
      args: Subset<T, WorkoutAggregateArgs>,
    ): Prisma.PrismaPromise<GetWorkoutAggregateType<T>>;

    /**
     * Group by Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WorkoutGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WorkoutGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetWorkoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Workout model
     */
    readonly fields: WorkoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    workoutExercises<T extends Workout$workoutExercisesArgs<ExtArgs> = {}>(
      args?: Subset<T, Workout$workoutExercisesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    comments<T extends Workout$commentsArgs<ExtArgs> = {}>(
      args?: Subset<T, Workout$commentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Workout model
   */
  interface WorkoutFieldRefs {
    readonly id: FieldRef<'Workout', 'String'>;
    readonly userId: FieldRef<'Workout', 'String'>;
    readonly workoutDate: FieldRef<'Workout', 'DateTime'>;
    readonly status: FieldRef<'Workout', 'WorkoutStatus'>;
    readonly focus: FieldRef<'Workout', 'String[]'>;
    readonly location: FieldRef<'Workout', 'String'>;
    readonly comment: FieldRef<'Workout', 'String'>;
    readonly rawTranscript: FieldRef<'Workout', 'String'>;
    readonly sourceMessageId: FieldRef<'Workout', 'Int'>;
    readonly previewMessageId: FieldRef<'Workout', 'Int'>;
    readonly publishedMessageId: FieldRef<'Workout', 'Int'>;
    readonly createdAt: FieldRef<'Workout', 'DateTime'>;
    readonly updatedAt: FieldRef<'Workout', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Workout findUnique
   */
  export type WorkoutFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput;
  };

  /**
   * Workout findUniqueOrThrow
   */
  export type WorkoutFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter, which Workout to fetch.
     */
    where: WorkoutWhereUniqueInput;
  };

  /**
   * Workout findFirst
   */
  export type WorkoutFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Workouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[];
  };

  /**
   * Workout findFirstOrThrow
   */
  export type WorkoutFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter, which Workout to fetch.
     */
    where?: WorkoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Workouts.
     */
    cursor?: WorkoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Workouts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Workouts.
     */
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[];
  };

  /**
   * Workout findMany
   */
  export type WorkoutFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter, which Workouts to fetch.
     */
    where?: WorkoutWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Workouts to fetch.
     */
    orderBy?: WorkoutOrderByWithRelationInput | WorkoutOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Workouts.
     */
    cursor?: WorkoutWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Workouts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Workouts.
     */
    skip?: number;
    distinct?: WorkoutScalarFieldEnum | WorkoutScalarFieldEnum[];
  };

  /**
   * Workout create
   */
  export type WorkoutCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * The data needed to create a Workout.
     */
    data: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>;
  };

  /**
   * Workout createMany
   */
  export type WorkoutCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Workout createManyAndReturn
   */
  export type WorkoutCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * The data used to create many Workouts.
     */
    data: WorkoutCreateManyInput | WorkoutCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Workout update
   */
  export type WorkoutUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * The data needed to update a Workout.
     */
    data: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>;
    /**
     * Choose, which Workout to update.
     */
    where: WorkoutWhereUniqueInput;
  };

  /**
   * Workout updateMany
   */
  export type WorkoutUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>;
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput;
    /**
     * Limit how many Workouts to update.
     */
    limit?: number;
  };

  /**
   * Workout updateManyAndReturn
   */
  export type WorkoutUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * The data used to update Workouts.
     */
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyInput>;
    /**
     * Filter which Workouts to update
     */
    where?: WorkoutWhereInput;
    /**
     * Limit how many Workouts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Workout upsert
   */
  export type WorkoutUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * The filter to search for the Workout to update in case it exists.
     */
    where: WorkoutWhereUniqueInput;
    /**
     * In case the Workout found by the `where` argument doesn't exist, create a new Workout with this data.
     */
    create: XOR<WorkoutCreateInput, WorkoutUncheckedCreateInput>;
    /**
     * In case the Workout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutUpdateInput, WorkoutUncheckedUpdateInput>;
  };

  /**
   * Workout delete
   */
  export type WorkoutDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
    /**
     * Filter which Workout to delete.
     */
    where: WorkoutWhereUniqueInput;
  };

  /**
   * Workout deleteMany
   */
  export type WorkoutDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Workouts to delete
     */
    where?: WorkoutWhereInput;
    /**
     * Limit how many Workouts to delete.
     */
    limit?: number;
  };

  /**
   * Workout.workoutExercises
   */
  export type Workout$workoutExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    where?: WorkoutExerciseWhereInput;
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    cursor?: WorkoutExerciseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[];
  };

  /**
   * Workout.comments
   */
  export type Workout$commentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    where?: WorkoutCommentWhereInput;
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    cursor?: WorkoutCommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WorkoutCommentScalarFieldEnum | WorkoutCommentScalarFieldEnum[];
  };

  /**
   * Workout without action
   */
  export type WorkoutDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Workout
     */
    select?: WorkoutSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Workout
     */
    omit?: WorkoutOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutInclude<ExtArgs> | null;
  };

  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null;
    _min: ExerciseMinAggregateOutputType | null;
    _max: ExerciseMaxAggregateOutputType | null;
  };

  export type ExerciseMinAggregateOutputType = {
    id: string | null;
    canonicalName: string | null;
    displayNameRu: string | null;
    displayNameEn: string | null;
    movementPattern: string | null;
    equipment: string | null;
    level: string | null;
    exerciseType: string | null;
    category: $Enums.ExerciseCategory | null;
    isGlobal: boolean | null;
    createdBy: string | null;
    createdAt: Date | null;
  };

  export type ExerciseMaxAggregateOutputType = {
    id: string | null;
    canonicalName: string | null;
    displayNameRu: string | null;
    displayNameEn: string | null;
    movementPattern: string | null;
    equipment: string | null;
    level: string | null;
    exerciseType: string | null;
    category: $Enums.ExerciseCategory | null;
    isGlobal: boolean | null;
    createdBy: string | null;
    createdAt: Date | null;
  };

  export type ExerciseCountAggregateOutputType = {
    id: number;
    canonicalName: number;
    displayNameRu: number;
    displayNameEn: number;
    movementPattern: number;
    equipment: number;
    primaryMuscles: number;
    secondaryMuscles: number;
    level: number;
    instructions: number;
    exerciseType: number;
    category: number;
    isGlobal: number;
    createdBy: number;
    createdAt: number;
    _all: number;
  };

  export type ExerciseMinAggregateInputType = {
    id?: true;
    canonicalName?: true;
    displayNameRu?: true;
    displayNameEn?: true;
    movementPattern?: true;
    equipment?: true;
    level?: true;
    exerciseType?: true;
    category?: true;
    isGlobal?: true;
    createdBy?: true;
    createdAt?: true;
  };

  export type ExerciseMaxAggregateInputType = {
    id?: true;
    canonicalName?: true;
    displayNameRu?: true;
    displayNameEn?: true;
    movementPattern?: true;
    equipment?: true;
    level?: true;
    exerciseType?: true;
    category?: true;
    isGlobal?: true;
    createdBy?: true;
    createdAt?: true;
  };

  export type ExerciseCountAggregateInputType = {
    id?: true;
    canonicalName?: true;
    displayNameRu?: true;
    displayNameEn?: true;
    movementPattern?: true;
    equipment?: true;
    primaryMuscles?: true;
    secondaryMuscles?: true;
    level?: true;
    instructions?: true;
    exerciseType?: true;
    category?: true;
    isGlobal?: true;
    createdBy?: true;
    createdAt?: true;
    _all?: true;
  };

  export type ExerciseAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Exercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Exercises
     **/
    _count?: true | ExerciseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ExerciseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ExerciseMaxAggregateInputType;
  };

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
    [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>;
  };

  export type ExerciseGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseWhereInput;
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[];
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum;
    having?: ExerciseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExerciseCountAggregateInputType | true;
    _min?: ExerciseMinAggregateInputType;
    _max?: ExerciseMaxAggregateInputType;
  };

  export type ExerciseGroupByOutputType = {
    id: string;
    canonicalName: string;
    displayNameRu: string | null;
    displayNameEn: string | null;
    movementPattern: string | null;
    equipment: string | null;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    level: string | null;
    instructions: string[];
    exerciseType: string | null;
    category: $Enums.ExerciseCategory | null;
    isGlobal: boolean;
    createdBy: string | null;
    createdAt: Date;
    _count: ExerciseCountAggregateOutputType | null;
    _min: ExerciseMinAggregateOutputType | null;
    _max: ExerciseMaxAggregateOutputType | null;
  };

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ExerciseGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
          : GetScalarType<T[P], ExerciseGroupByOutputType[P]>;
      }
    >
  >;

  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        canonicalName?: boolean;
        displayNameRu?: boolean;
        displayNameEn?: boolean;
        movementPattern?: boolean;
        equipment?: boolean;
        primaryMuscles?: boolean;
        secondaryMuscles?: boolean;
        level?: boolean;
        instructions?: boolean;
        exerciseType?: boolean;
        category?: boolean;
        isGlobal?: boolean;
        createdBy?: boolean;
        createdAt?: boolean;
        creator?: boolean | Exercise$creatorArgs<ExtArgs>;
        synonyms?: boolean | Exercise$synonymsArgs<ExtArgs>;
        workoutExercises?: boolean | Exercise$workoutExercisesArgs<ExtArgs>;
        userMappings?: boolean | Exercise$userMappingsArgs<ExtArgs>;
        _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['exercise']
    >;

  export type ExerciseSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      canonicalName?: boolean;
      displayNameRu?: boolean;
      displayNameEn?: boolean;
      movementPattern?: boolean;
      equipment?: boolean;
      primaryMuscles?: boolean;
      secondaryMuscles?: boolean;
      level?: boolean;
      instructions?: boolean;
      exerciseType?: boolean;
      category?: boolean;
      isGlobal?: boolean;
      createdBy?: boolean;
      createdAt?: boolean;
      creator?: boolean | Exercise$creatorArgs<ExtArgs>;
    },
    ExtArgs['result']['exercise']
  >;

  export type ExerciseSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      canonicalName?: boolean;
      displayNameRu?: boolean;
      displayNameEn?: boolean;
      movementPattern?: boolean;
      equipment?: boolean;
      primaryMuscles?: boolean;
      secondaryMuscles?: boolean;
      level?: boolean;
      instructions?: boolean;
      exerciseType?: boolean;
      category?: boolean;
      isGlobal?: boolean;
      createdBy?: boolean;
      createdAt?: boolean;
      creator?: boolean | Exercise$creatorArgs<ExtArgs>;
    },
    ExtArgs['result']['exercise']
  >;

  export type ExerciseSelectScalar = {
    id?: boolean;
    canonicalName?: boolean;
    displayNameRu?: boolean;
    displayNameEn?: boolean;
    movementPattern?: boolean;
    equipment?: boolean;
    primaryMuscles?: boolean;
    secondaryMuscles?: boolean;
    level?: boolean;
    instructions?: boolean;
    exerciseType?: boolean;
    category?: boolean;
    isGlobal?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
  };

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'canonicalName'
      | 'displayNameRu'
      | 'displayNameEn'
      | 'movementPattern'
      | 'equipment'
      | 'primaryMuscles'
      | 'secondaryMuscles'
      | 'level'
      | 'instructions'
      | 'exerciseType'
      | 'category'
      | 'isGlobal'
      | 'createdBy'
      | 'createdAt',
      ExtArgs['result']['exercise']
    >;
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      creator?: boolean | Exercise$creatorArgs<ExtArgs>;
      synonyms?: boolean | Exercise$synonymsArgs<ExtArgs>;
      workoutExercises?: boolean | Exercise$workoutExercisesArgs<ExtArgs>;
      userMappings?: boolean | Exercise$userMappingsArgs<ExtArgs>;
      _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>;
    };
  export type ExerciseIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    creator?: boolean | Exercise$creatorArgs<ExtArgs>;
  };
  export type ExerciseIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    creator?: boolean | Exercise$creatorArgs<ExtArgs>;
  };

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Exercise';
      objects: {
        creator: Prisma.$UserPayload<ExtArgs> | null;
        synonyms: Prisma.$ExerciseSynonymPayload<ExtArgs>[];
        workoutExercises: Prisma.$WorkoutExercisePayload<ExtArgs>[];
        userMappings: Prisma.$UserExerciseMappingPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          canonicalName: string;
          displayNameRu: string | null;
          displayNameEn: string | null;
          movementPattern: string | null;
          equipment: string | null;
          primaryMuscles: string[];
          secondaryMuscles: string[];
          level: string | null;
          instructions: string[];
          exerciseType: string | null;
          category: $Enums.ExerciseCategory | null;
          isGlobal: boolean;
          createdBy: string | null;
          createdAt: Date;
        },
        ExtArgs['result']['exercise']
      >;
      composites: {};
    };

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> =
    $Result.GetResult<Prisma.$ExercisePayload, S>;

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ExerciseFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ExerciseCountAggregateInputType | true;
  };

  export interface ExerciseDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Exercise'];
      meta: { name: 'Exercise' };
    };
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(
      args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<
        Prisma.$ExercisePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<
        Prisma.$ExercisePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(
      args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     *
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ExerciseFindManyArgs>(
      args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     *
     */
    create<T extends ExerciseCreateArgs>(
      args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ExerciseCreateManyArgs>(
      args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExercisePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     *
     */
    delete<T extends ExerciseDeleteArgs>(
      args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ExerciseUpdateArgs>(
      args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(
      args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ExerciseUpdateManyArgs>(
      args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExercisePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(
      args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      $Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
     **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ExerciseAggregateArgs>(
      args: Subset<T, ExerciseAggregateArgs>,
    ): Prisma.PrismaPromise<GetExerciseAggregateType<T>>;

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Exercise model
     */
    readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    creator<T extends Exercise$creatorArgs<ExtArgs> = {}>(
      args?: Subset<T, Exercise$creatorArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    synonyms<T extends Exercise$synonymsArgs<ExtArgs> = {}>(
      args?: Subset<T, Exercise$synonymsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    workoutExercises<T extends Exercise$workoutExercisesArgs<ExtArgs> = {}>(
      args?: Subset<T, Exercise$workoutExercisesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    userMappings<T extends Exercise$userMappingsArgs<ExtArgs> = {}>(
      args?: Subset<T, Exercise$userMappingsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$UserExerciseMappingPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<'Exercise', 'String'>;
    readonly canonicalName: FieldRef<'Exercise', 'String'>;
    readonly displayNameRu: FieldRef<'Exercise', 'String'>;
    readonly displayNameEn: FieldRef<'Exercise', 'String'>;
    readonly movementPattern: FieldRef<'Exercise', 'String'>;
    readonly equipment: FieldRef<'Exercise', 'String'>;
    readonly primaryMuscles: FieldRef<'Exercise', 'String[]'>;
    readonly secondaryMuscles: FieldRef<'Exercise', 'String[]'>;
    readonly level: FieldRef<'Exercise', 'String'>;
    readonly instructions: FieldRef<'Exercise', 'String[]'>;
    readonly exerciseType: FieldRef<'Exercise', 'String'>;
    readonly category: FieldRef<'Exercise', 'ExerciseCategory'>;
    readonly isGlobal: FieldRef<'Exercise', 'Boolean'>;
    readonly createdBy: FieldRef<'Exercise', 'String'>;
    readonly createdAt: FieldRef<'Exercise', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput;
  };

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput;
  };

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Exercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[];
  };

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Exercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[];
  };

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Exercises.
     */
    skip?: number;
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[];
  };

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>;
  };

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>;
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput;
  };

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput;
    /**
     * Limit how many Exercises to update.
     */
    limit?: number;
  };

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput;
    /**
     * Limit how many Exercises to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput;
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>;
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>;
  };

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput;
  };

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput;
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number;
  };

  /**
   * Exercise.creator
   */
  export type Exercise$creatorArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    where?: UserWhereInput;
  };

  /**
   * Exercise.synonyms
   */
  export type Exercise$synonymsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    where?: ExerciseSynonymWhereInput;
    orderBy?: ExerciseSynonymOrderByWithRelationInput | ExerciseSynonymOrderByWithRelationInput[];
    cursor?: ExerciseSynonymWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ExerciseSynonymScalarFieldEnum | ExerciseSynonymScalarFieldEnum[];
  };

  /**
   * Exercise.workoutExercises
   */
  export type Exercise$workoutExercisesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    where?: WorkoutExerciseWhereInput;
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    cursor?: WorkoutExerciseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[];
  };

  /**
   * Exercise.userMappings
   */
  export type Exercise$userMappingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    where?: UserExerciseMappingWhereInput;
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    cursor?: UserExerciseMappingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: UserExerciseMappingScalarFieldEnum | UserExerciseMappingScalarFieldEnum[];
  };

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null;
  };

  /**
   * Model ExerciseSynonym
   */

  export type AggregateExerciseSynonym = {
    _count: ExerciseSynonymCountAggregateOutputType | null;
    _min: ExerciseSynonymMinAggregateOutputType | null;
    _max: ExerciseSynonymMaxAggregateOutputType | null;
  };

  export type ExerciseSynonymMinAggregateOutputType = {
    id: string | null;
    exerciseId: string | null;
    synonym: string | null;
    language: string | null;
  };

  export type ExerciseSynonymMaxAggregateOutputType = {
    id: string | null;
    exerciseId: string | null;
    synonym: string | null;
    language: string | null;
  };

  export type ExerciseSynonymCountAggregateOutputType = {
    id: number;
    exerciseId: number;
    synonym: number;
    language: number;
    _all: number;
  };

  export type ExerciseSynonymMinAggregateInputType = {
    id?: true;
    exerciseId?: true;
    synonym?: true;
    language?: true;
  };

  export type ExerciseSynonymMaxAggregateInputType = {
    id?: true;
    exerciseId?: true;
    synonym?: true;
    language?: true;
  };

  export type ExerciseSynonymCountAggregateInputType = {
    id?: true;
    exerciseId?: true;
    synonym?: true;
    language?: true;
    _all?: true;
  };

  export type ExerciseSynonymAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ExerciseSynonym to aggregate.
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSynonyms to fetch.
     */
    orderBy?: ExerciseSynonymOrderByWithRelationInput | ExerciseSynonymOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ExerciseSynonymWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSynonyms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSynonyms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ExerciseSynonyms
     **/
    _count?: true | ExerciseSynonymCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ExerciseSynonymMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ExerciseSynonymMaxAggregateInputType;
  };

  export type GetExerciseSynonymAggregateType<T extends ExerciseSynonymAggregateArgs> = {
    [P in keyof T & keyof AggregateExerciseSynonym]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciseSynonym[P]>
      : GetScalarType<T[P], AggregateExerciseSynonym[P]>;
  };

  export type ExerciseSynonymGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseSynonymWhereInput;
    orderBy?:
      | ExerciseSynonymOrderByWithAggregationInput
      | ExerciseSynonymOrderByWithAggregationInput[];
    by: ExerciseSynonymScalarFieldEnum[] | ExerciseSynonymScalarFieldEnum;
    having?: ExerciseSynonymScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExerciseSynonymCountAggregateInputType | true;
    _min?: ExerciseSynonymMinAggregateInputType;
    _max?: ExerciseSynonymMaxAggregateInputType;
  };

  export type ExerciseSynonymGroupByOutputType = {
    id: string;
    exerciseId: string;
    synonym: string;
    language: string;
    _count: ExerciseSynonymCountAggregateOutputType | null;
    _min: ExerciseSynonymMinAggregateOutputType | null;
    _max: ExerciseSynonymMaxAggregateOutputType | null;
  };

  type GetExerciseSynonymGroupByPayload<T extends ExerciseSynonymGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ExerciseSynonymGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ExerciseSynonymGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseSynonymGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseSynonymGroupByOutputType[P]>;
        }
      >
    >;

  export type ExerciseSynonymSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      exerciseId?: boolean;
      synonym?: boolean;
      language?: boolean;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSynonym']
  >;

  export type ExerciseSynonymSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      exerciseId?: boolean;
      synonym?: boolean;
      language?: boolean;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSynonym']
  >;

  export type ExerciseSynonymSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      exerciseId?: boolean;
      synonym?: boolean;
      language?: boolean;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSynonym']
  >;

  export type ExerciseSynonymSelectScalar = {
    id?: boolean;
    exerciseId?: boolean;
    synonym?: boolean;
    language?: boolean;
  };

  export type ExerciseSynonymOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'exerciseId' | 'synonym' | 'language',
    ExtArgs['result']['exerciseSynonym']
  >;
  export type ExerciseSynonymInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };
  export type ExerciseSynonymIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };
  export type ExerciseSynonymIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };

  export type $ExerciseSynonymPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ExerciseSynonym';
    objects: {
      exercise: Prisma.$ExercisePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        exerciseId: string;
        synonym: string;
        language: string;
      },
      ExtArgs['result']['exerciseSynonym']
    >;
    composites: {};
  };

  type ExerciseSynonymGetPayload<
    S extends boolean | null | undefined | ExerciseSynonymDefaultArgs,
  > = $Result.GetResult<Prisma.$ExerciseSynonymPayload, S>;

  type ExerciseSynonymCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ExerciseSynonymFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExerciseSynonymCountAggregateInputType | true;
  };

  export interface ExerciseSynonymDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ExerciseSynonym'];
      meta: { name: 'ExerciseSynonym' };
    };
    /**
     * Find zero or one ExerciseSynonym that matches the filter.
     * @param {ExerciseSynonymFindUniqueArgs} args - Arguments to find a ExerciseSynonym
     * @example
     * // Get one ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseSynonymFindUniqueArgs>(
      args: SelectSubset<T, ExerciseSynonymFindUniqueArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ExerciseSynonym that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseSynonymFindUniqueOrThrowArgs} args - Arguments to find a ExerciseSynonym
     * @example
     * // Get one ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseSynonymFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ExerciseSynonymFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ExerciseSynonym that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymFindFirstArgs} args - Arguments to find a ExerciseSynonym
     * @example
     * // Get one ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseSynonymFindFirstArgs>(
      args?: SelectSubset<T, ExerciseSynonymFindFirstArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ExerciseSynonym that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymFindFirstOrThrowArgs} args - Arguments to find a ExerciseSynonym
     * @example
     * // Get one ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseSynonymFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExerciseSynonymFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ExerciseSynonyms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciseSynonyms
     * const exerciseSynonyms = await prisma.exerciseSynonym.findMany()
     *
     * // Get first 10 ExerciseSynonyms
     * const exerciseSynonyms = await prisma.exerciseSynonym.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const exerciseSynonymWithIdOnly = await prisma.exerciseSynonym.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ExerciseSynonymFindManyArgs>(
      args?: SelectSubset<T, ExerciseSynonymFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a ExerciseSynonym.
     * @param {ExerciseSynonymCreateArgs} args - Arguments to create a ExerciseSynonym.
     * @example
     * // Create one ExerciseSynonym
     * const ExerciseSynonym = await prisma.exerciseSynonym.create({
     *   data: {
     *     // ... data to create a ExerciseSynonym
     *   }
     * })
     *
     */
    create<T extends ExerciseSynonymCreateArgs>(
      args: SelectSubset<T, ExerciseSynonymCreateArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ExerciseSynonyms.
     * @param {ExerciseSynonymCreateManyArgs} args - Arguments to create many ExerciseSynonyms.
     * @example
     * // Create many ExerciseSynonyms
     * const exerciseSynonym = await prisma.exerciseSynonym.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ExerciseSynonymCreateManyArgs>(
      args?: SelectSubset<T, ExerciseSynonymCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ExerciseSynonyms and returns the data saved in the database.
     * @param {ExerciseSynonymCreateManyAndReturnArgs} args - Arguments to create many ExerciseSynonyms.
     * @example
     * // Create many ExerciseSynonyms
     * const exerciseSynonym = await prisma.exerciseSynonym.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ExerciseSynonyms and only return the `id`
     * const exerciseSynonymWithIdOnly = await prisma.exerciseSynonym.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ExerciseSynonymCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ExerciseSynonymCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ExerciseSynonym.
     * @param {ExerciseSynonymDeleteArgs} args - Arguments to delete one ExerciseSynonym.
     * @example
     * // Delete one ExerciseSynonym
     * const ExerciseSynonym = await prisma.exerciseSynonym.delete({
     *   where: {
     *     // ... filter to delete one ExerciseSynonym
     *   }
     * })
     *
     */
    delete<T extends ExerciseSynonymDeleteArgs>(
      args: SelectSubset<T, ExerciseSynonymDeleteArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ExerciseSynonym.
     * @param {ExerciseSynonymUpdateArgs} args - Arguments to update one ExerciseSynonym.
     * @example
     * // Update one ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ExerciseSynonymUpdateArgs>(
      args: SelectSubset<T, ExerciseSynonymUpdateArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ExerciseSynonyms.
     * @param {ExerciseSynonymDeleteManyArgs} args - Arguments to filter ExerciseSynonyms to delete.
     * @example
     * // Delete a few ExerciseSynonyms
     * const { count } = await prisma.exerciseSynonym.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ExerciseSynonymDeleteManyArgs>(
      args?: SelectSubset<T, ExerciseSynonymDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ExerciseSynonyms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciseSynonyms
     * const exerciseSynonym = await prisma.exerciseSynonym.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ExerciseSynonymUpdateManyArgs>(
      args: SelectSubset<T, ExerciseSynonymUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ExerciseSynonyms and returns the data updated in the database.
     * @param {ExerciseSynonymUpdateManyAndReturnArgs} args - Arguments to update many ExerciseSynonyms.
     * @example
     * // Update many ExerciseSynonyms
     * const exerciseSynonym = await prisma.exerciseSynonym.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ExerciseSynonyms and only return the `id`
     * const exerciseSynonymWithIdOnly = await prisma.exerciseSynonym.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ExerciseSynonymUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ExerciseSynonymUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExerciseSynonymPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ExerciseSynonym.
     * @param {ExerciseSynonymUpsertArgs} args - Arguments to update or create a ExerciseSynonym.
     * @example
     * // Update or create a ExerciseSynonym
     * const exerciseSynonym = await prisma.exerciseSynonym.upsert({
     *   create: {
     *     // ... data to create a ExerciseSynonym
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciseSynonym we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseSynonymUpsertArgs>(
      args: SelectSubset<T, ExerciseSynonymUpsertArgs<ExtArgs>>,
    ): Prisma__ExerciseSynonymClient<
      $Result.GetResult<Prisma.$ExerciseSynonymPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ExerciseSynonyms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymCountArgs} args - Arguments to filter ExerciseSynonyms to count.
     * @example
     * // Count the number of ExerciseSynonyms
     * const count = await prisma.exerciseSynonym.count({
     *   where: {
     *     // ... the filter for the ExerciseSynonyms we want to count
     *   }
     * })
     **/
    count<T extends ExerciseSynonymCountArgs>(
      args?: Subset<T, ExerciseSynonymCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseSynonymCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ExerciseSynonym.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ExerciseSynonymAggregateArgs>(
      args: Subset<T, ExerciseSynonymAggregateArgs>,
    ): Prisma.PrismaPromise<GetExerciseSynonymAggregateType<T>>;

    /**
     * Group by ExerciseSynonym.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSynonymGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ExerciseSynonymGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseSynonymGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseSynonymGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ExerciseSynonymGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetExerciseSynonymGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ExerciseSynonym model
     */
    readonly fields: ExerciseSynonymFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciseSynonym.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseSynonymClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      | $Result.GetResult<
          Prisma.$ExercisePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ExerciseSynonym model
   */
  interface ExerciseSynonymFieldRefs {
    readonly id: FieldRef<'ExerciseSynonym', 'String'>;
    readonly exerciseId: FieldRef<'ExerciseSynonym', 'String'>;
    readonly synonym: FieldRef<'ExerciseSynonym', 'String'>;
    readonly language: FieldRef<'ExerciseSynonym', 'String'>;
  }

  // Custom InputTypes
  /**
   * ExerciseSynonym findUnique
   */
  export type ExerciseSynonymFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSynonym to fetch.
     */
    where: ExerciseSynonymWhereUniqueInput;
  };

  /**
   * ExerciseSynonym findUniqueOrThrow
   */
  export type ExerciseSynonymFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSynonym to fetch.
     */
    where: ExerciseSynonymWhereUniqueInput;
  };

  /**
   * ExerciseSynonym findFirst
   */
  export type ExerciseSynonymFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSynonym to fetch.
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSynonyms to fetch.
     */
    orderBy?: ExerciseSynonymOrderByWithRelationInput | ExerciseSynonymOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ExerciseSynonyms.
     */
    cursor?: ExerciseSynonymWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSynonyms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSynonyms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ExerciseSynonyms.
     */
    distinct?: ExerciseSynonymScalarFieldEnum | ExerciseSynonymScalarFieldEnum[];
  };

  /**
   * ExerciseSynonym findFirstOrThrow
   */
  export type ExerciseSynonymFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSynonym to fetch.
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSynonyms to fetch.
     */
    orderBy?: ExerciseSynonymOrderByWithRelationInput | ExerciseSynonymOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ExerciseSynonyms.
     */
    cursor?: ExerciseSynonymWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSynonyms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSynonyms.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ExerciseSynonyms.
     */
    distinct?: ExerciseSynonymScalarFieldEnum | ExerciseSynonymScalarFieldEnum[];
  };

  /**
   * ExerciseSynonym findMany
   */
  export type ExerciseSynonymFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSynonyms to fetch.
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSynonyms to fetch.
     */
    orderBy?: ExerciseSynonymOrderByWithRelationInput | ExerciseSynonymOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ExerciseSynonyms.
     */
    cursor?: ExerciseSynonymWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSynonyms from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSynonyms.
     */
    skip?: number;
    distinct?: ExerciseSynonymScalarFieldEnum | ExerciseSynonymScalarFieldEnum[];
  };

  /**
   * ExerciseSynonym create
   */
  export type ExerciseSynonymCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * The data needed to create a ExerciseSynonym.
     */
    data: XOR<ExerciseSynonymCreateInput, ExerciseSynonymUncheckedCreateInput>;
  };

  /**
   * ExerciseSynonym createMany
   */
  export type ExerciseSynonymCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ExerciseSynonyms.
     */
    data: ExerciseSynonymCreateManyInput | ExerciseSynonymCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ExerciseSynonym createManyAndReturn
   */
  export type ExerciseSynonymCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * The data used to create many ExerciseSynonyms.
     */
    data: ExerciseSynonymCreateManyInput | ExerciseSynonymCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ExerciseSynonym update
   */
  export type ExerciseSynonymUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * The data needed to update a ExerciseSynonym.
     */
    data: XOR<ExerciseSynonymUpdateInput, ExerciseSynonymUncheckedUpdateInput>;
    /**
     * Choose, which ExerciseSynonym to update.
     */
    where: ExerciseSynonymWhereUniqueInput;
  };

  /**
   * ExerciseSynonym updateMany
   */
  export type ExerciseSynonymUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ExerciseSynonyms.
     */
    data: XOR<ExerciseSynonymUpdateManyMutationInput, ExerciseSynonymUncheckedUpdateManyInput>;
    /**
     * Filter which ExerciseSynonyms to update
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * Limit how many ExerciseSynonyms to update.
     */
    limit?: number;
  };

  /**
   * ExerciseSynonym updateManyAndReturn
   */
  export type ExerciseSynonymUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * The data used to update ExerciseSynonyms.
     */
    data: XOR<ExerciseSynonymUpdateManyMutationInput, ExerciseSynonymUncheckedUpdateManyInput>;
    /**
     * Filter which ExerciseSynonyms to update
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * Limit how many ExerciseSynonyms to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ExerciseSynonym upsert
   */
  export type ExerciseSynonymUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * The filter to search for the ExerciseSynonym to update in case it exists.
     */
    where: ExerciseSynonymWhereUniqueInput;
    /**
     * In case the ExerciseSynonym found by the `where` argument doesn't exist, create a new ExerciseSynonym with this data.
     */
    create: XOR<ExerciseSynonymCreateInput, ExerciseSynonymUncheckedCreateInput>;
    /**
     * In case the ExerciseSynonym was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseSynonymUpdateInput, ExerciseSynonymUncheckedUpdateInput>;
  };

  /**
   * ExerciseSynonym delete
   */
  export type ExerciseSynonymDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
    /**
     * Filter which ExerciseSynonym to delete.
     */
    where: ExerciseSynonymWhereUniqueInput;
  };

  /**
   * ExerciseSynonym deleteMany
   */
  export type ExerciseSynonymDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ExerciseSynonyms to delete
     */
    where?: ExerciseSynonymWhereInput;
    /**
     * Limit how many ExerciseSynonyms to delete.
     */
    limit?: number;
  };

  /**
   * ExerciseSynonym without action
   */
  export type ExerciseSynonymDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSynonym
     */
    select?: ExerciseSynonymSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSynonym
     */
    omit?: ExerciseSynonymOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSynonymInclude<ExtArgs> | null;
  };

  /**
   * Model UserExerciseMapping
   */

  export type AggregateUserExerciseMapping = {
    _count: UserExerciseMappingCountAggregateOutputType | null;
    _avg: UserExerciseMappingAvgAggregateOutputType | null;
    _sum: UserExerciseMappingSumAggregateOutputType | null;
    _min: UserExerciseMappingMinAggregateOutputType | null;
    _max: UserExerciseMappingMaxAggregateOutputType | null;
  };

  export type UserExerciseMappingAvgAggregateOutputType = {
    useCount: number | null;
  };

  export type UserExerciseMappingSumAggregateOutputType = {
    useCount: number | null;
  };

  export type UserExerciseMappingMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    inputText: string | null;
    exerciseId: string | null;
    useCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserExerciseMappingMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    inputText: string | null;
    exerciseId: string | null;
    useCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserExerciseMappingCountAggregateOutputType = {
    id: number;
    userId: number;
    inputText: number;
    exerciseId: number;
    useCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserExerciseMappingAvgAggregateInputType = {
    useCount?: true;
  };

  export type UserExerciseMappingSumAggregateInputType = {
    useCount?: true;
  };

  export type UserExerciseMappingMinAggregateInputType = {
    id?: true;
    userId?: true;
    inputText?: true;
    exerciseId?: true;
    useCount?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserExerciseMappingMaxAggregateInputType = {
    id?: true;
    userId?: true;
    inputText?: true;
    exerciseId?: true;
    useCount?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserExerciseMappingCountAggregateInputType = {
    id?: true;
    userId?: true;
    inputText?: true;
    exerciseId?: true;
    useCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserExerciseMappingAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserExerciseMapping to aggregate.
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserExerciseMappings to fetch.
     */
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserExerciseMappingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserExerciseMappings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserExerciseMappings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserExerciseMappings
     **/
    _count?: true | UserExerciseMappingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserExerciseMappingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserExerciseMappingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserExerciseMappingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserExerciseMappingMaxAggregateInputType;
  };

  export type GetUserExerciseMappingAggregateType<T extends UserExerciseMappingAggregateArgs> = {
    [P in keyof T & keyof AggregateUserExerciseMapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserExerciseMapping[P]>
      : GetScalarType<T[P], AggregateUserExerciseMapping[P]>;
  };

  export type UserExerciseMappingGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserExerciseMappingWhereInput;
    orderBy?:
      | UserExerciseMappingOrderByWithAggregationInput
      | UserExerciseMappingOrderByWithAggregationInput[];
    by: UserExerciseMappingScalarFieldEnum[] | UserExerciseMappingScalarFieldEnum;
    having?: UserExerciseMappingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserExerciseMappingCountAggregateInputType | true;
    _avg?: UserExerciseMappingAvgAggregateInputType;
    _sum?: UserExerciseMappingSumAggregateInputType;
    _min?: UserExerciseMappingMinAggregateInputType;
    _max?: UserExerciseMappingMaxAggregateInputType;
  };

  export type UserExerciseMappingGroupByOutputType = {
    id: string;
    userId: string;
    inputText: string;
    exerciseId: string;
    useCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: UserExerciseMappingCountAggregateOutputType | null;
    _avg: UserExerciseMappingAvgAggregateOutputType | null;
    _sum: UserExerciseMappingSumAggregateOutputType | null;
    _min: UserExerciseMappingMinAggregateOutputType | null;
    _max: UserExerciseMappingMaxAggregateOutputType | null;
  };

  type GetUserExerciseMappingGroupByPayload<T extends UserExerciseMappingGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UserExerciseMappingGroupByOutputType, T['by']> & {
          [P in keyof T & keyof UserExerciseMappingGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserExerciseMappingGroupByOutputType[P]>
            : GetScalarType<T[P], UserExerciseMappingGroupByOutputType[P]>;
        }
      >
    >;

  export type UserExerciseMappingSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      inputText?: boolean;
      exerciseId?: boolean;
      useCount?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userExerciseMapping']
  >;

  export type UserExerciseMappingSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      inputText?: boolean;
      exerciseId?: boolean;
      useCount?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userExerciseMapping']
  >;

  export type UserExerciseMappingSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      inputText?: boolean;
      exerciseId?: boolean;
      useCount?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userExerciseMapping']
  >;

  export type UserExerciseMappingSelectScalar = {
    id?: boolean;
    userId?: boolean;
    inputText?: boolean;
    exerciseId?: boolean;
    useCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserExerciseMappingOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'userId' | 'inputText' | 'exerciseId' | 'useCount' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['userExerciseMapping']
  >;
  export type UserExerciseMappingInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };
  export type UserExerciseMappingIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };
  export type UserExerciseMappingIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };

  export type $UserExerciseMappingPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'UserExerciseMapping';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      exercise: Prisma.$ExercisePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        inputText: string;
        exerciseId: string;
        useCount: number;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['userExerciseMapping']
    >;
    composites: {};
  };

  type UserExerciseMappingGetPayload<
    S extends boolean | null | undefined | UserExerciseMappingDefaultArgs,
  > = $Result.GetResult<Prisma.$UserExerciseMappingPayload, S>;

  type UserExerciseMappingCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserExerciseMappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserExerciseMappingCountAggregateInputType | true;
  };

  export interface UserExerciseMappingDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['UserExerciseMapping'];
      meta: { name: 'UserExerciseMapping' };
    };
    /**
     * Find zero or one UserExerciseMapping that matches the filter.
     * @param {UserExerciseMappingFindUniqueArgs} args - Arguments to find a UserExerciseMapping
     * @example
     * // Get one UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserExerciseMappingFindUniqueArgs>(
      args: SelectSubset<T, UserExerciseMappingFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one UserExerciseMapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserExerciseMappingFindUniqueOrThrowArgs} args - Arguments to find a UserExerciseMapping
     * @example
     * // Get one UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserExerciseMappingFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserExerciseMappingFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserExerciseMapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingFindFirstArgs} args - Arguments to find a UserExerciseMapping
     * @example
     * // Get one UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserExerciseMappingFindFirstArgs>(
      args?: SelectSubset<T, UserExerciseMappingFindFirstArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserExerciseMapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingFindFirstOrThrowArgs} args - Arguments to find a UserExerciseMapping
     * @example
     * // Get one UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserExerciseMappingFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserExerciseMappingFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more UserExerciseMappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserExerciseMappings
     * const userExerciseMappings = await prisma.userExerciseMapping.findMany()
     *
     * // Get first 10 UserExerciseMappings
     * const userExerciseMappings = await prisma.userExerciseMapping.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userExerciseMappingWithIdOnly = await prisma.userExerciseMapping.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserExerciseMappingFindManyArgs>(
      args?: SelectSubset<T, UserExerciseMappingFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a UserExerciseMapping.
     * @param {UserExerciseMappingCreateArgs} args - Arguments to create a UserExerciseMapping.
     * @example
     * // Create one UserExerciseMapping
     * const UserExerciseMapping = await prisma.userExerciseMapping.create({
     *   data: {
     *     // ... data to create a UserExerciseMapping
     *   }
     * })
     *
     */
    create<T extends UserExerciseMappingCreateArgs>(
      args: SelectSubset<T, UserExerciseMappingCreateArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many UserExerciseMappings.
     * @param {UserExerciseMappingCreateManyArgs} args - Arguments to create many UserExerciseMappings.
     * @example
     * // Create many UserExerciseMappings
     * const userExerciseMapping = await prisma.userExerciseMapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserExerciseMappingCreateManyArgs>(
      args?: SelectSubset<T, UserExerciseMappingCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserExerciseMappings and returns the data saved in the database.
     * @param {UserExerciseMappingCreateManyAndReturnArgs} args - Arguments to create many UserExerciseMappings.
     * @example
     * // Create many UserExerciseMappings
     * const userExerciseMapping = await prisma.userExerciseMapping.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserExerciseMappings and only return the `id`
     * const userExerciseMappingWithIdOnly = await prisma.userExerciseMapping.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserExerciseMappingCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserExerciseMappingCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a UserExerciseMapping.
     * @param {UserExerciseMappingDeleteArgs} args - Arguments to delete one UserExerciseMapping.
     * @example
     * // Delete one UserExerciseMapping
     * const UserExerciseMapping = await prisma.userExerciseMapping.delete({
     *   where: {
     *     // ... filter to delete one UserExerciseMapping
     *   }
     * })
     *
     */
    delete<T extends UserExerciseMappingDeleteArgs>(
      args: SelectSubset<T, UserExerciseMappingDeleteArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one UserExerciseMapping.
     * @param {UserExerciseMappingUpdateArgs} args - Arguments to update one UserExerciseMapping.
     * @example
     * // Update one UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserExerciseMappingUpdateArgs>(
      args: SelectSubset<T, UserExerciseMappingUpdateArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more UserExerciseMappings.
     * @param {UserExerciseMappingDeleteManyArgs} args - Arguments to filter UserExerciseMappings to delete.
     * @example
     * // Delete a few UserExerciseMappings
     * const { count } = await prisma.userExerciseMapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserExerciseMappingDeleteManyArgs>(
      args?: SelectSubset<T, UserExerciseMappingDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserExerciseMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserExerciseMappings
     * const userExerciseMapping = await prisma.userExerciseMapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserExerciseMappingUpdateManyArgs>(
      args: SelectSubset<T, UserExerciseMappingUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserExerciseMappings and returns the data updated in the database.
     * @param {UserExerciseMappingUpdateManyAndReturnArgs} args - Arguments to update many UserExerciseMappings.
     * @example
     * // Update many UserExerciseMappings
     * const userExerciseMapping = await prisma.userExerciseMapping.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserExerciseMappings and only return the `id`
     * const userExerciseMappingWithIdOnly = await prisma.userExerciseMapping.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserExerciseMappingUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserExerciseMappingUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one UserExerciseMapping.
     * @param {UserExerciseMappingUpsertArgs} args - Arguments to update or create a UserExerciseMapping.
     * @example
     * // Update or create a UserExerciseMapping
     * const userExerciseMapping = await prisma.userExerciseMapping.upsert({
     *   create: {
     *     // ... data to create a UserExerciseMapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserExerciseMapping we want to update
     *   }
     * })
     */
    upsert<T extends UserExerciseMappingUpsertArgs>(
      args: SelectSubset<T, UserExerciseMappingUpsertArgs<ExtArgs>>,
    ): Prisma__UserExerciseMappingClient<
      $Result.GetResult<
        Prisma.$UserExerciseMappingPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of UserExerciseMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingCountArgs} args - Arguments to filter UserExerciseMappings to count.
     * @example
     * // Count the number of UserExerciseMappings
     * const count = await prisma.userExerciseMapping.count({
     *   where: {
     *     // ... the filter for the UserExerciseMappings we want to count
     *   }
     * })
     **/
    count<T extends UserExerciseMappingCountArgs>(
      args?: Subset<T, UserExerciseMappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserExerciseMappingCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserExerciseMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserExerciseMappingAggregateArgs>(
      args: Subset<T, UserExerciseMappingAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserExerciseMappingAggregateType<T>>;

    /**
     * Group by UserExerciseMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserExerciseMappingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserExerciseMappingGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserExerciseMappingGroupByArgs['orderBy'] }
        : { orderBy?: UserExerciseMappingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserExerciseMappingGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserExerciseMappingGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserExerciseMapping model
     */
    readonly fields: UserExerciseMappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserExerciseMapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserExerciseMappingClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      | $Result.GetResult<
          Prisma.$ExercisePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the UserExerciseMapping model
   */
  interface UserExerciseMappingFieldRefs {
    readonly id: FieldRef<'UserExerciseMapping', 'String'>;
    readonly userId: FieldRef<'UserExerciseMapping', 'String'>;
    readonly inputText: FieldRef<'UserExerciseMapping', 'String'>;
    readonly exerciseId: FieldRef<'UserExerciseMapping', 'String'>;
    readonly useCount: FieldRef<'UserExerciseMapping', 'Int'>;
    readonly createdAt: FieldRef<'UserExerciseMapping', 'DateTime'>;
    readonly updatedAt: FieldRef<'UserExerciseMapping', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * UserExerciseMapping findUnique
   */
  export type UserExerciseMappingFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter, which UserExerciseMapping to fetch.
     */
    where: UserExerciseMappingWhereUniqueInput;
  };

  /**
   * UserExerciseMapping findUniqueOrThrow
   */
  export type UserExerciseMappingFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter, which UserExerciseMapping to fetch.
     */
    where: UserExerciseMappingWhereUniqueInput;
  };

  /**
   * UserExerciseMapping findFirst
   */
  export type UserExerciseMappingFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter, which UserExerciseMapping to fetch.
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserExerciseMappings to fetch.
     */
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserExerciseMappings.
     */
    cursor?: UserExerciseMappingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserExerciseMappings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserExerciseMappings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserExerciseMappings.
     */
    distinct?: UserExerciseMappingScalarFieldEnum | UserExerciseMappingScalarFieldEnum[];
  };

  /**
   * UserExerciseMapping findFirstOrThrow
   */
  export type UserExerciseMappingFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter, which UserExerciseMapping to fetch.
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserExerciseMappings to fetch.
     */
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserExerciseMappings.
     */
    cursor?: UserExerciseMappingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserExerciseMappings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserExerciseMappings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserExerciseMappings.
     */
    distinct?: UserExerciseMappingScalarFieldEnum | UserExerciseMappingScalarFieldEnum[];
  };

  /**
   * UserExerciseMapping findMany
   */
  export type UserExerciseMappingFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter, which UserExerciseMappings to fetch.
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserExerciseMappings to fetch.
     */
    orderBy?:
      | UserExerciseMappingOrderByWithRelationInput
      | UserExerciseMappingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserExerciseMappings.
     */
    cursor?: UserExerciseMappingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserExerciseMappings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserExerciseMappings.
     */
    skip?: number;
    distinct?: UserExerciseMappingScalarFieldEnum | UserExerciseMappingScalarFieldEnum[];
  };

  /**
   * UserExerciseMapping create
   */
  export type UserExerciseMappingCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserExerciseMapping.
     */
    data: XOR<UserExerciseMappingCreateInput, UserExerciseMappingUncheckedCreateInput>;
  };

  /**
   * UserExerciseMapping createMany
   */
  export type UserExerciseMappingCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserExerciseMappings.
     */
    data: UserExerciseMappingCreateManyInput | UserExerciseMappingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserExerciseMapping createManyAndReturn
   */
  export type UserExerciseMappingCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * The data used to create many UserExerciseMappings.
     */
    data: UserExerciseMappingCreateManyInput | UserExerciseMappingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserExerciseMapping update
   */
  export type UserExerciseMappingUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserExerciseMapping.
     */
    data: XOR<UserExerciseMappingUpdateInput, UserExerciseMappingUncheckedUpdateInput>;
    /**
     * Choose, which UserExerciseMapping to update.
     */
    where: UserExerciseMappingWhereUniqueInput;
  };

  /**
   * UserExerciseMapping updateMany
   */
  export type UserExerciseMappingUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserExerciseMappings.
     */
    data: XOR<
      UserExerciseMappingUpdateManyMutationInput,
      UserExerciseMappingUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserExerciseMappings to update
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * Limit how many UserExerciseMappings to update.
     */
    limit?: number;
  };

  /**
   * UserExerciseMapping updateManyAndReturn
   */
  export type UserExerciseMappingUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * The data used to update UserExerciseMappings.
     */
    data: XOR<
      UserExerciseMappingUpdateManyMutationInput,
      UserExerciseMappingUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserExerciseMappings to update
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * Limit how many UserExerciseMappings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserExerciseMapping upsert
   */
  export type UserExerciseMappingUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserExerciseMapping to update in case it exists.
     */
    where: UserExerciseMappingWhereUniqueInput;
    /**
     * In case the UserExerciseMapping found by the `where` argument doesn't exist, create a new UserExerciseMapping with this data.
     */
    create: XOR<UserExerciseMappingCreateInput, UserExerciseMappingUncheckedCreateInput>;
    /**
     * In case the UserExerciseMapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserExerciseMappingUpdateInput, UserExerciseMappingUncheckedUpdateInput>;
  };

  /**
   * UserExerciseMapping delete
   */
  export type UserExerciseMappingDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
    /**
     * Filter which UserExerciseMapping to delete.
     */
    where: UserExerciseMappingWhereUniqueInput;
  };

  /**
   * UserExerciseMapping deleteMany
   */
  export type UserExerciseMappingDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserExerciseMappings to delete
     */
    where?: UserExerciseMappingWhereInput;
    /**
     * Limit how many UserExerciseMappings to delete.
     */
    limit?: number;
  };

  /**
   * UserExerciseMapping without action
   */
  export type UserExerciseMappingDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserExerciseMapping
     */
    select?: UserExerciseMappingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserExerciseMapping
     */
    omit?: UserExerciseMappingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserExerciseMappingInclude<ExtArgs> | null;
  };

  /**
   * Model WorkoutExercise
   */

  export type AggregateWorkoutExercise = {
    _count: WorkoutExerciseCountAggregateOutputType | null;
    _avg: WorkoutExerciseAvgAggregateOutputType | null;
    _sum: WorkoutExerciseSumAggregateOutputType | null;
    _min: WorkoutExerciseMinAggregateOutputType | null;
    _max: WorkoutExerciseMaxAggregateOutputType | null;
  };

  export type WorkoutExerciseAvgAggregateOutputType = {
    sortOrder: number | null;
  };

  export type WorkoutExerciseSumAggregateOutputType = {
    sortOrder: number | null;
  };

  export type WorkoutExerciseMinAggregateOutputType = {
    id: string | null;
    workoutId: string | null;
    exerciseId: string | null;
    sortOrder: number | null;
  };

  export type WorkoutExerciseMaxAggregateOutputType = {
    id: string | null;
    workoutId: string | null;
    exerciseId: string | null;
    sortOrder: number | null;
  };

  export type WorkoutExerciseCountAggregateOutputType = {
    id: number;
    workoutId: number;
    exerciseId: number;
    sortOrder: number;
    _all: number;
  };

  export type WorkoutExerciseAvgAggregateInputType = {
    sortOrder?: true;
  };

  export type WorkoutExerciseSumAggregateInputType = {
    sortOrder?: true;
  };

  export type WorkoutExerciseMinAggregateInputType = {
    id?: true;
    workoutId?: true;
    exerciseId?: true;
    sortOrder?: true;
  };

  export type WorkoutExerciseMaxAggregateInputType = {
    id?: true;
    workoutId?: true;
    exerciseId?: true;
    sortOrder?: true;
  };

  export type WorkoutExerciseCountAggregateInputType = {
    id?: true;
    workoutId?: true;
    exerciseId?: true;
    sortOrder?: true;
    _all?: true;
  };

  export type WorkoutExerciseAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WorkoutExercise to aggregate.
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WorkoutExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkoutExercises
     **/
    _count?: true | WorkoutExerciseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: WorkoutExerciseAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: WorkoutExerciseSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WorkoutExerciseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WorkoutExerciseMaxAggregateInputType;
  };

  export type GetWorkoutExerciseAggregateType<T extends WorkoutExerciseAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkoutExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutExercise[P]>
      : GetScalarType<T[P], AggregateWorkoutExercise[P]>;
  };

  export type WorkoutExerciseGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutExerciseWhereInput;
    orderBy?:
      | WorkoutExerciseOrderByWithAggregationInput
      | WorkoutExerciseOrderByWithAggregationInput[];
    by: WorkoutExerciseScalarFieldEnum[] | WorkoutExerciseScalarFieldEnum;
    having?: WorkoutExerciseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkoutExerciseCountAggregateInputType | true;
    _avg?: WorkoutExerciseAvgAggregateInputType;
    _sum?: WorkoutExerciseSumAggregateInputType;
    _min?: WorkoutExerciseMinAggregateInputType;
    _max?: WorkoutExerciseMaxAggregateInputType;
  };

  export type WorkoutExerciseGroupByOutputType = {
    id: string;
    workoutId: string;
    exerciseId: string;
    sortOrder: number;
    _count: WorkoutExerciseCountAggregateOutputType | null;
    _avg: WorkoutExerciseAvgAggregateOutputType | null;
    _sum: WorkoutExerciseSumAggregateOutputType | null;
    _min: WorkoutExerciseMinAggregateOutputType | null;
    _max: WorkoutExerciseMaxAggregateOutputType | null;
  };

  type GetWorkoutExerciseGroupByPayload<T extends WorkoutExerciseGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<WorkoutExerciseGroupByOutputType, T['by']> & {
          [P in keyof T & keyof WorkoutExerciseGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutExerciseGroupByOutputType[P]>;
        }
      >
    >;

  export type WorkoutExerciseSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      exerciseId?: boolean;
      sortOrder?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
      sets?: boolean | WorkoutExercise$setsArgs<ExtArgs>;
      comments?: boolean | WorkoutExercise$commentsArgs<ExtArgs>;
      _count?: boolean | WorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutExercise']
  >;

  export type WorkoutExerciseSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      exerciseId?: boolean;
      sortOrder?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutExercise']
  >;

  export type WorkoutExerciseSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      exerciseId?: boolean;
      sortOrder?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutExercise']
  >;

  export type WorkoutExerciseSelectScalar = {
    id?: boolean;
    workoutId?: boolean;
    exerciseId?: boolean;
    sortOrder?: boolean;
  };

  export type WorkoutExerciseOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'workoutId' | 'exerciseId' | 'sortOrder',
    ExtArgs['result']['workoutExercise']
  >;
  export type WorkoutExerciseInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
    sets?: boolean | WorkoutExercise$setsArgs<ExtArgs>;
    comments?: boolean | WorkoutExercise$commentsArgs<ExtArgs>;
    _count?: boolean | WorkoutExerciseCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type WorkoutExerciseIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };
  export type WorkoutExerciseIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>;
  };

  export type $WorkoutExercisePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'WorkoutExercise';
    objects: {
      workout: Prisma.$WorkoutPayload<ExtArgs>;
      exercise: Prisma.$ExercisePayload<ExtArgs>;
      sets: Prisma.$ExerciseSetPayload<ExtArgs>[];
      comments: Prisma.$WorkoutCommentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        workoutId: string;
        exerciseId: string;
        sortOrder: number;
      },
      ExtArgs['result']['workoutExercise']
    >;
    composites: {};
  };

  type WorkoutExerciseGetPayload<
    S extends boolean | null | undefined | WorkoutExerciseDefaultArgs,
  > = $Result.GetResult<Prisma.$WorkoutExercisePayload, S>;

  type WorkoutExerciseCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<WorkoutExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkoutExerciseCountAggregateInputType | true;
  };

  export interface WorkoutExerciseDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['WorkoutExercise'];
      meta: { name: 'WorkoutExercise' };
    };
    /**
     * Find zero or one WorkoutExercise that matches the filter.
     * @param {WorkoutExerciseFindUniqueArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutExerciseFindUniqueArgs>(
      args: SelectSubset<T, WorkoutExerciseFindUniqueArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one WorkoutExercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutExerciseFindUniqueOrThrowArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutExerciseFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WorkoutExerciseFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WorkoutExercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindFirstArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutExerciseFindFirstArgs>(
      args?: SelectSubset<T, WorkoutExerciseFindFirstArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WorkoutExercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindFirstOrThrowArgs} args - Arguments to find a WorkoutExercise
     * @example
     * // Get one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutExerciseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkoutExerciseFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more WorkoutExercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutExercises
     * const workoutExercises = await prisma.workoutExercise.findMany()
     *
     * // Get first 10 WorkoutExercises
     * const workoutExercises = await prisma.workoutExercise.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkoutExerciseFindManyArgs>(
      args?: SelectSubset<T, WorkoutExerciseFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a WorkoutExercise.
     * @param {WorkoutExerciseCreateArgs} args - Arguments to create a WorkoutExercise.
     * @example
     * // Create one WorkoutExercise
     * const WorkoutExercise = await prisma.workoutExercise.create({
     *   data: {
     *     // ... data to create a WorkoutExercise
     *   }
     * })
     *
     */
    create<T extends WorkoutExerciseCreateArgs>(
      args: SelectSubset<T, WorkoutExerciseCreateArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many WorkoutExercises.
     * @param {WorkoutExerciseCreateManyArgs} args - Arguments to create many WorkoutExercises.
     * @example
     * // Create many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkoutExerciseCreateManyArgs>(
      args?: SelectSubset<T, WorkoutExerciseCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many WorkoutExercises and returns the data saved in the database.
     * @param {WorkoutExerciseCreateManyAndReturnArgs} args - Arguments to create many WorkoutExercises.
     * @example
     * // Create many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkoutExercises and only return the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkoutExerciseCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WorkoutExerciseCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a WorkoutExercise.
     * @param {WorkoutExerciseDeleteArgs} args - Arguments to delete one WorkoutExercise.
     * @example
     * // Delete one WorkoutExercise
     * const WorkoutExercise = await prisma.workoutExercise.delete({
     *   where: {
     *     // ... filter to delete one WorkoutExercise
     *   }
     * })
     *
     */
    delete<T extends WorkoutExerciseDeleteArgs>(
      args: SelectSubset<T, WorkoutExerciseDeleteArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one WorkoutExercise.
     * @param {WorkoutExerciseUpdateArgs} args - Arguments to update one WorkoutExercise.
     * @example
     * // Update one WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkoutExerciseUpdateArgs>(
      args: SelectSubset<T, WorkoutExerciseUpdateArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more WorkoutExercises.
     * @param {WorkoutExerciseDeleteManyArgs} args - Arguments to filter WorkoutExercises to delete.
     * @example
     * // Delete a few WorkoutExercises
     * const { count } = await prisma.workoutExercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkoutExerciseDeleteManyArgs>(
      args?: SelectSubset<T, WorkoutExerciseDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkoutExerciseUpdateManyArgs>(
      args: SelectSubset<T, WorkoutExerciseUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WorkoutExercises and returns the data updated in the database.
     * @param {WorkoutExerciseUpdateManyAndReturnArgs} args - Arguments to update many WorkoutExercises.
     * @example
     * // Update many WorkoutExercises
     * const workoutExercise = await prisma.workoutExercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkoutExercises and only return the `id`
     * const workoutExerciseWithIdOnly = await prisma.workoutExercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WorkoutExerciseUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WorkoutExerciseUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one WorkoutExercise.
     * @param {WorkoutExerciseUpsertArgs} args - Arguments to update or create a WorkoutExercise.
     * @example
     * // Update or create a WorkoutExercise
     * const workoutExercise = await prisma.workoutExercise.upsert({
     *   create: {
     *     // ... data to create a WorkoutExercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutExercise we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutExerciseUpsertArgs>(
      args: SelectSubset<T, WorkoutExerciseUpsertArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<Prisma.$WorkoutExercisePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of WorkoutExercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseCountArgs} args - Arguments to filter WorkoutExercises to count.
     * @example
     * // Count the number of WorkoutExercises
     * const count = await prisma.workoutExercise.count({
     *   where: {
     *     // ... the filter for the WorkoutExercises we want to count
     *   }
     * })
     **/
    count<T extends WorkoutExerciseCountArgs>(
      args?: Subset<T, WorkoutExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutExerciseCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a WorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WorkoutExerciseAggregateArgs>(
      args: Subset<T, WorkoutExerciseAggregateArgs>,
    ): Prisma.PrismaPromise<GetWorkoutExerciseAggregateType<T>>;

    /**
     * Group by WorkoutExercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WorkoutExerciseGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutExerciseGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WorkoutExerciseGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetWorkoutExerciseGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkoutExercise model
     */
    readonly fields: WorkoutExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutExercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutExerciseClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    workout<T extends WorkoutDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutDefaultArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      | $Result.GetResult<
          Prisma.$WorkoutPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>,
    ): Prisma__ExerciseClient<
      | $Result.GetResult<
          Prisma.$ExercisePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    sets<T extends WorkoutExercise$setsArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutExercise$setsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    comments<T extends WorkoutExercise$commentsArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutExercise$commentsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the WorkoutExercise model
   */
  interface WorkoutExerciseFieldRefs {
    readonly id: FieldRef<'WorkoutExercise', 'String'>;
    readonly workoutId: FieldRef<'WorkoutExercise', 'String'>;
    readonly exerciseId: FieldRef<'WorkoutExercise', 'String'>;
    readonly sortOrder: FieldRef<'WorkoutExercise', 'Int'>;
  }

  // Custom InputTypes
  /**
   * WorkoutExercise findUnique
   */
  export type WorkoutExerciseFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where: WorkoutExerciseWhereUniqueInput;
  };

  /**
   * WorkoutExercise findUniqueOrThrow
   */
  export type WorkoutExerciseFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where: WorkoutExerciseWhereUniqueInput;
  };

  /**
   * WorkoutExercise findFirst
   */
  export type WorkoutExerciseFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkoutExercises.
     */
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[];
  };

  /**
   * WorkoutExercise findFirstOrThrow
   */
  export type WorkoutExerciseFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutExercise to fetch.
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkoutExercises.
     */
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[];
  };

  /**
   * WorkoutExercise findMany
   */
  export type WorkoutExerciseFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutExercises to fetch.
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutExercises to fetch.
     */
    orderBy?: WorkoutExerciseOrderByWithRelationInput | WorkoutExerciseOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkoutExercises.
     */
    cursor?: WorkoutExerciseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutExercises from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutExercises.
     */
    skip?: number;
    distinct?: WorkoutExerciseScalarFieldEnum | WorkoutExerciseScalarFieldEnum[];
  };

  /**
   * WorkoutExercise create
   */
  export type WorkoutExerciseCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to create a WorkoutExercise.
     */
    data: XOR<WorkoutExerciseCreateInput, WorkoutExerciseUncheckedCreateInput>;
  };

  /**
   * WorkoutExercise createMany
   */
  export type WorkoutExerciseCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many WorkoutExercises.
     */
    data: WorkoutExerciseCreateManyInput | WorkoutExerciseCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WorkoutExercise createManyAndReturn
   */
  export type WorkoutExerciseCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkoutExercises.
     */
    data: WorkoutExerciseCreateManyInput | WorkoutExerciseCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * WorkoutExercise update
   */
  export type WorkoutExerciseUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * The data needed to update a WorkoutExercise.
     */
    data: XOR<WorkoutExerciseUpdateInput, WorkoutExerciseUncheckedUpdateInput>;
    /**
     * Choose, which WorkoutExercise to update.
     */
    where: WorkoutExerciseWhereUniqueInput;
  };

  /**
   * WorkoutExercise updateMany
   */
  export type WorkoutExerciseUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update WorkoutExercises.
     */
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which WorkoutExercises to update
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * Limit how many WorkoutExercises to update.
     */
    limit?: number;
  };

  /**
   * WorkoutExercise updateManyAndReturn
   */
  export type WorkoutExerciseUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * The data used to update WorkoutExercises.
     */
    data: XOR<WorkoutExerciseUpdateManyMutationInput, WorkoutExerciseUncheckedUpdateManyInput>;
    /**
     * Filter which WorkoutExercises to update
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * Limit how many WorkoutExercises to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * WorkoutExercise upsert
   */
  export type WorkoutExerciseUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * The filter to search for the WorkoutExercise to update in case it exists.
     */
    where: WorkoutExerciseWhereUniqueInput;
    /**
     * In case the WorkoutExercise found by the `where` argument doesn't exist, create a new WorkoutExercise with this data.
     */
    create: XOR<WorkoutExerciseCreateInput, WorkoutExerciseUncheckedCreateInput>;
    /**
     * In case the WorkoutExercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutExerciseUpdateInput, WorkoutExerciseUncheckedUpdateInput>;
  };

  /**
   * WorkoutExercise delete
   */
  export type WorkoutExerciseDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    /**
     * Filter which WorkoutExercise to delete.
     */
    where: WorkoutExerciseWhereUniqueInput;
  };

  /**
   * WorkoutExercise deleteMany
   */
  export type WorkoutExerciseDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WorkoutExercises to delete
     */
    where?: WorkoutExerciseWhereInput;
    /**
     * Limit how many WorkoutExercises to delete.
     */
    limit?: number;
  };

  /**
   * WorkoutExercise.sets
   */
  export type WorkoutExercise$setsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    where?: ExerciseSetWhereInput;
    orderBy?: ExerciseSetOrderByWithRelationInput | ExerciseSetOrderByWithRelationInput[];
    cursor?: ExerciseSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ExerciseSetScalarFieldEnum | ExerciseSetScalarFieldEnum[];
  };

  /**
   * WorkoutExercise.comments
   */
  export type WorkoutExercise$commentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    where?: WorkoutCommentWhereInput;
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    cursor?: WorkoutCommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WorkoutCommentScalarFieldEnum | WorkoutCommentScalarFieldEnum[];
  };

  /**
   * WorkoutExercise without action
   */
  export type WorkoutExerciseDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
  };

  /**
   * Model ExerciseSet
   */

  export type AggregateExerciseSet = {
    _count: ExerciseSetCountAggregateOutputType | null;
    _avg: ExerciseSetAvgAggregateOutputType | null;
    _sum: ExerciseSetSumAggregateOutputType | null;
    _min: ExerciseSetMinAggregateOutputType | null;
    _max: ExerciseSetMaxAggregateOutputType | null;
  };

  export type ExerciseSetAvgAggregateOutputType = {
    setNumber: number | null;
    reps: number | null;
    weight: Decimal | null;
  };

  export type ExerciseSetSumAggregateOutputType = {
    setNumber: number | null;
    reps: number | null;
    weight: Decimal | null;
  };

  export type ExerciseSetMinAggregateOutputType = {
    id: string | null;
    workoutExerciseId: string | null;
    setNumber: number | null;
    reps: number | null;
    weight: Decimal | null;
    unit: $Enums.WeightUnit | null;
  };

  export type ExerciseSetMaxAggregateOutputType = {
    id: string | null;
    workoutExerciseId: string | null;
    setNumber: number | null;
    reps: number | null;
    weight: Decimal | null;
    unit: $Enums.WeightUnit | null;
  };

  export type ExerciseSetCountAggregateOutputType = {
    id: number;
    workoutExerciseId: number;
    setNumber: number;
    reps: number;
    weight: number;
    unit: number;
    _all: number;
  };

  export type ExerciseSetAvgAggregateInputType = {
    setNumber?: true;
    reps?: true;
    weight?: true;
  };

  export type ExerciseSetSumAggregateInputType = {
    setNumber?: true;
    reps?: true;
    weight?: true;
  };

  export type ExerciseSetMinAggregateInputType = {
    id?: true;
    workoutExerciseId?: true;
    setNumber?: true;
    reps?: true;
    weight?: true;
    unit?: true;
  };

  export type ExerciseSetMaxAggregateInputType = {
    id?: true;
    workoutExerciseId?: true;
    setNumber?: true;
    reps?: true;
    weight?: true;
    unit?: true;
  };

  export type ExerciseSetCountAggregateInputType = {
    id?: true;
    workoutExerciseId?: true;
    setNumber?: true;
    reps?: true;
    weight?: true;
    unit?: true;
    _all?: true;
  };

  export type ExerciseSetAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ExerciseSet to aggregate.
     */
    where?: ExerciseSetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSets to fetch.
     */
    orderBy?: ExerciseSetOrderByWithRelationInput | ExerciseSetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ExerciseSetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ExerciseSets
     **/
    _count?: true | ExerciseSetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ExerciseSetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ExerciseSetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ExerciseSetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ExerciseSetMaxAggregateInputType;
  };

  export type GetExerciseSetAggregateType<T extends ExerciseSetAggregateArgs> = {
    [P in keyof T & keyof AggregateExerciseSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExerciseSet[P]>
      : GetScalarType<T[P], AggregateExerciseSet[P]>;
  };

  export type ExerciseSetGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ExerciseSetWhereInput;
    orderBy?: ExerciseSetOrderByWithAggregationInput | ExerciseSetOrderByWithAggregationInput[];
    by: ExerciseSetScalarFieldEnum[] | ExerciseSetScalarFieldEnum;
    having?: ExerciseSetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExerciseSetCountAggregateInputType | true;
    _avg?: ExerciseSetAvgAggregateInputType;
    _sum?: ExerciseSetSumAggregateInputType;
    _min?: ExerciseSetMinAggregateInputType;
    _max?: ExerciseSetMaxAggregateInputType;
  };

  export type ExerciseSetGroupByOutputType = {
    id: string;
    workoutExerciseId: string;
    setNumber: number;
    reps: number;
    weight: Decimal | null;
    unit: $Enums.WeightUnit;
    _count: ExerciseSetCountAggregateOutputType | null;
    _avg: ExerciseSetAvgAggregateOutputType | null;
    _sum: ExerciseSetSumAggregateOutputType | null;
    _min: ExerciseSetMinAggregateOutputType | null;
    _max: ExerciseSetMaxAggregateOutputType | null;
  };

  type GetExerciseSetGroupByPayload<T extends ExerciseSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseSetGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ExerciseSetGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ExerciseSetGroupByOutputType[P]>
          : GetScalarType<T[P], ExerciseSetGroupByOutputType[P]>;
      }
    >
  >;

  export type ExerciseSetSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutExerciseId?: boolean;
      setNumber?: boolean;
      reps?: boolean;
      weight?: boolean;
      unit?: boolean;
      workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSet']
  >;

  export type ExerciseSetSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutExerciseId?: boolean;
      setNumber?: boolean;
      reps?: boolean;
      weight?: boolean;
      unit?: boolean;
      workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSet']
  >;

  export type ExerciseSetSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutExerciseId?: boolean;
      setNumber?: boolean;
      reps?: boolean;
      weight?: boolean;
      unit?: boolean;
      workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['exerciseSet']
  >;

  export type ExerciseSetSelectScalar = {
    id?: boolean;
    workoutExerciseId?: boolean;
    setNumber?: boolean;
    reps?: boolean;
    weight?: boolean;
    unit?: boolean;
  };

  export type ExerciseSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'workoutExerciseId' | 'setNumber' | 'reps' | 'weight' | 'unit',
      ExtArgs['result']['exerciseSet']
    >;
  export type ExerciseSetInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
  };
  export type ExerciseSetIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
  };
  export type ExerciseSetIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workoutExercise?: boolean | WorkoutExerciseDefaultArgs<ExtArgs>;
  };

  export type $ExerciseSetPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ExerciseSet';
    objects: {
      workoutExercise: Prisma.$WorkoutExercisePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        workoutExerciseId: string;
        setNumber: number;
        reps: number;
        weight: Prisma.Decimal | null;
        unit: $Enums.WeightUnit;
      },
      ExtArgs['result']['exerciseSet']
    >;
    composites: {};
  };

  type ExerciseSetGetPayload<S extends boolean | null | undefined | ExerciseSetDefaultArgs> =
    $Result.GetResult<Prisma.$ExerciseSetPayload, S>;

  type ExerciseSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseSetCountAggregateInputType | true;
    };

  export interface ExerciseSetDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ExerciseSet'];
      meta: { name: 'ExerciseSet' };
    };
    /**
     * Find zero or one ExerciseSet that matches the filter.
     * @param {ExerciseSetFindUniqueArgs} args - Arguments to find a ExerciseSet
     * @example
     * // Get one ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseSetFindUniqueArgs>(
      args: SelectSubset<T, ExerciseSetFindUniqueArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ExerciseSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseSetFindUniqueOrThrowArgs} args - Arguments to find a ExerciseSet
     * @example
     * // Get one ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseSetFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ExerciseSetFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ExerciseSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetFindFirstArgs} args - Arguments to find a ExerciseSet
     * @example
     * // Get one ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseSetFindFirstArgs>(
      args?: SelectSubset<T, ExerciseSetFindFirstArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ExerciseSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetFindFirstOrThrowArgs} args - Arguments to find a ExerciseSet
     * @example
     * // Get one ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseSetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExerciseSetFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ExerciseSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExerciseSets
     * const exerciseSets = await prisma.exerciseSet.findMany()
     *
     * // Get first 10 ExerciseSets
     * const exerciseSets = await prisma.exerciseSet.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const exerciseSetWithIdOnly = await prisma.exerciseSet.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ExerciseSetFindManyArgs>(
      args?: SelectSubset<T, ExerciseSetFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a ExerciseSet.
     * @param {ExerciseSetCreateArgs} args - Arguments to create a ExerciseSet.
     * @example
     * // Create one ExerciseSet
     * const ExerciseSet = await prisma.exerciseSet.create({
     *   data: {
     *     // ... data to create a ExerciseSet
     *   }
     * })
     *
     */
    create<T extends ExerciseSetCreateArgs>(
      args: SelectSubset<T, ExerciseSetCreateArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ExerciseSets.
     * @param {ExerciseSetCreateManyArgs} args - Arguments to create many ExerciseSets.
     * @example
     * // Create many ExerciseSets
     * const exerciseSet = await prisma.exerciseSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ExerciseSetCreateManyArgs>(
      args?: SelectSubset<T, ExerciseSetCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ExerciseSets and returns the data saved in the database.
     * @param {ExerciseSetCreateManyAndReturnArgs} args - Arguments to create many ExerciseSets.
     * @example
     * // Create many ExerciseSets
     * const exerciseSet = await prisma.exerciseSet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ExerciseSets and only return the `id`
     * const exerciseSetWithIdOnly = await prisma.exerciseSet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ExerciseSetCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ExerciseSetCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ExerciseSet.
     * @param {ExerciseSetDeleteArgs} args - Arguments to delete one ExerciseSet.
     * @example
     * // Delete one ExerciseSet
     * const ExerciseSet = await prisma.exerciseSet.delete({
     *   where: {
     *     // ... filter to delete one ExerciseSet
     *   }
     * })
     *
     */
    delete<T extends ExerciseSetDeleteArgs>(
      args: SelectSubset<T, ExerciseSetDeleteArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ExerciseSet.
     * @param {ExerciseSetUpdateArgs} args - Arguments to update one ExerciseSet.
     * @example
     * // Update one ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ExerciseSetUpdateArgs>(
      args: SelectSubset<T, ExerciseSetUpdateArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ExerciseSets.
     * @param {ExerciseSetDeleteManyArgs} args - Arguments to filter ExerciseSets to delete.
     * @example
     * // Delete a few ExerciseSets
     * const { count } = await prisma.exerciseSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ExerciseSetDeleteManyArgs>(
      args?: SelectSubset<T, ExerciseSetDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ExerciseSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExerciseSets
     * const exerciseSet = await prisma.exerciseSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ExerciseSetUpdateManyArgs>(
      args: SelectSubset<T, ExerciseSetUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ExerciseSets and returns the data updated in the database.
     * @param {ExerciseSetUpdateManyAndReturnArgs} args - Arguments to update many ExerciseSets.
     * @example
     * // Update many ExerciseSets
     * const exerciseSet = await prisma.exerciseSet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ExerciseSets and only return the `id`
     * const exerciseSetWithIdOnly = await prisma.exerciseSet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ExerciseSetUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ExerciseSetUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ExerciseSetPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ExerciseSet.
     * @param {ExerciseSetUpsertArgs} args - Arguments to update or create a ExerciseSet.
     * @example
     * // Update or create a ExerciseSet
     * const exerciseSet = await prisma.exerciseSet.upsert({
     *   create: {
     *     // ... data to create a ExerciseSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExerciseSet we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseSetUpsertArgs>(
      args: SelectSubset<T, ExerciseSetUpsertArgs<ExtArgs>>,
    ): Prisma__ExerciseSetClient<
      $Result.GetResult<Prisma.$ExerciseSetPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ExerciseSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetCountArgs} args - Arguments to filter ExerciseSets to count.
     * @example
     * // Count the number of ExerciseSets
     * const count = await prisma.exerciseSet.count({
     *   where: {
     *     // ... the filter for the ExerciseSets we want to count
     *   }
     * })
     **/
    count<T extends ExerciseSetCountArgs>(
      args?: Subset<T, ExerciseSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseSetCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ExerciseSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ExerciseSetAggregateArgs>(
      args: Subset<T, ExerciseSetAggregateArgs>,
    ): Prisma.PrismaPromise<GetExerciseSetAggregateType<T>>;

    /**
     * Group by ExerciseSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseSetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ExerciseSetGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseSetGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseSetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ExerciseSetGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetExerciseSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ExerciseSet model
     */
    readonly fields: ExerciseSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExerciseSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseSetClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    workoutExercise<T extends WorkoutExerciseDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutExerciseDefaultArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      | $Result.GetResult<
          Prisma.$WorkoutExercisePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ExerciseSet model
   */
  interface ExerciseSetFieldRefs {
    readonly id: FieldRef<'ExerciseSet', 'String'>;
    readonly workoutExerciseId: FieldRef<'ExerciseSet', 'String'>;
    readonly setNumber: FieldRef<'ExerciseSet', 'Int'>;
    readonly reps: FieldRef<'ExerciseSet', 'Int'>;
    readonly weight: FieldRef<'ExerciseSet', 'Decimal'>;
    readonly unit: FieldRef<'ExerciseSet', 'WeightUnit'>;
  }

  // Custom InputTypes
  /**
   * ExerciseSet findUnique
   */
  export type ExerciseSetFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSet to fetch.
     */
    where: ExerciseSetWhereUniqueInput;
  };

  /**
   * ExerciseSet findUniqueOrThrow
   */
  export type ExerciseSetFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSet to fetch.
     */
    where: ExerciseSetWhereUniqueInput;
  };

  /**
   * ExerciseSet findFirst
   */
  export type ExerciseSetFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSet to fetch.
     */
    where?: ExerciseSetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSets to fetch.
     */
    orderBy?: ExerciseSetOrderByWithRelationInput | ExerciseSetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ExerciseSets.
     */
    cursor?: ExerciseSetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ExerciseSets.
     */
    distinct?: ExerciseSetScalarFieldEnum | ExerciseSetScalarFieldEnum[];
  };

  /**
   * ExerciseSet findFirstOrThrow
   */
  export type ExerciseSetFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSet to fetch.
     */
    where?: ExerciseSetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSets to fetch.
     */
    orderBy?: ExerciseSetOrderByWithRelationInput | ExerciseSetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ExerciseSets.
     */
    cursor?: ExerciseSetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ExerciseSets.
     */
    distinct?: ExerciseSetScalarFieldEnum | ExerciseSetScalarFieldEnum[];
  };

  /**
   * ExerciseSet findMany
   */
  export type ExerciseSetFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter, which ExerciseSets to fetch.
     */
    where?: ExerciseSetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ExerciseSets to fetch.
     */
    orderBy?: ExerciseSetOrderByWithRelationInput | ExerciseSetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ExerciseSets.
     */
    cursor?: ExerciseSetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ExerciseSets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ExerciseSets.
     */
    skip?: number;
    distinct?: ExerciseSetScalarFieldEnum | ExerciseSetScalarFieldEnum[];
  };

  /**
   * ExerciseSet create
   */
  export type ExerciseSetCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * The data needed to create a ExerciseSet.
     */
    data: XOR<ExerciseSetCreateInput, ExerciseSetUncheckedCreateInput>;
  };

  /**
   * ExerciseSet createMany
   */
  export type ExerciseSetCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ExerciseSets.
     */
    data: ExerciseSetCreateManyInput | ExerciseSetCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ExerciseSet createManyAndReturn
   */
  export type ExerciseSetCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * The data used to create many ExerciseSets.
     */
    data: ExerciseSetCreateManyInput | ExerciseSetCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ExerciseSet update
   */
  export type ExerciseSetUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * The data needed to update a ExerciseSet.
     */
    data: XOR<ExerciseSetUpdateInput, ExerciseSetUncheckedUpdateInput>;
    /**
     * Choose, which ExerciseSet to update.
     */
    where: ExerciseSetWhereUniqueInput;
  };

  /**
   * ExerciseSet updateMany
   */
  export type ExerciseSetUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ExerciseSets.
     */
    data: XOR<ExerciseSetUpdateManyMutationInput, ExerciseSetUncheckedUpdateManyInput>;
    /**
     * Filter which ExerciseSets to update
     */
    where?: ExerciseSetWhereInput;
    /**
     * Limit how many ExerciseSets to update.
     */
    limit?: number;
  };

  /**
   * ExerciseSet updateManyAndReturn
   */
  export type ExerciseSetUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * The data used to update ExerciseSets.
     */
    data: XOR<ExerciseSetUpdateManyMutationInput, ExerciseSetUncheckedUpdateManyInput>;
    /**
     * Filter which ExerciseSets to update
     */
    where?: ExerciseSetWhereInput;
    /**
     * Limit how many ExerciseSets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ExerciseSet upsert
   */
  export type ExerciseSetUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * The filter to search for the ExerciseSet to update in case it exists.
     */
    where: ExerciseSetWhereUniqueInput;
    /**
     * In case the ExerciseSet found by the `where` argument doesn't exist, create a new ExerciseSet with this data.
     */
    create: XOR<ExerciseSetCreateInput, ExerciseSetUncheckedCreateInput>;
    /**
     * In case the ExerciseSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseSetUpdateInput, ExerciseSetUncheckedUpdateInput>;
  };

  /**
   * ExerciseSet delete
   */
  export type ExerciseSetDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
    /**
     * Filter which ExerciseSet to delete.
     */
    where: ExerciseSetWhereUniqueInput;
  };

  /**
   * ExerciseSet deleteMany
   */
  export type ExerciseSetDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ExerciseSets to delete
     */
    where?: ExerciseSetWhereInput;
    /**
     * Limit how many ExerciseSets to delete.
     */
    limit?: number;
  };

  /**
   * ExerciseSet without action
   */
  export type ExerciseSetDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ExerciseSet
     */
    select?: ExerciseSetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExerciseSet
     */
    omit?: ExerciseSetOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseSetInclude<ExtArgs> | null;
  };

  /**
   * Model WorkoutComment
   */

  export type AggregateWorkoutComment = {
    _count: WorkoutCommentCountAggregateOutputType | null;
    _min: WorkoutCommentMinAggregateOutputType | null;
    _max: WorkoutCommentMaxAggregateOutputType | null;
  };

  export type WorkoutCommentMinAggregateOutputType = {
    id: string | null;
    workoutId: string | null;
    workoutExerciseId: string | null;
    commentType: $Enums.CommentType | null;
    bodyPart: string | null;
    side: $Enums.BodySide | null;
    sensationType: $Enums.SensationType | null;
    rawText: string | null;
    createdAt: Date | null;
  };

  export type WorkoutCommentMaxAggregateOutputType = {
    id: string | null;
    workoutId: string | null;
    workoutExerciseId: string | null;
    commentType: $Enums.CommentType | null;
    bodyPart: string | null;
    side: $Enums.BodySide | null;
    sensationType: $Enums.SensationType | null;
    rawText: string | null;
    createdAt: Date | null;
  };

  export type WorkoutCommentCountAggregateOutputType = {
    id: number;
    workoutId: number;
    workoutExerciseId: number;
    commentType: number;
    bodyPart: number;
    side: number;
    sensationType: number;
    rawText: number;
    createdAt: number;
    _all: number;
  };

  export type WorkoutCommentMinAggregateInputType = {
    id?: true;
    workoutId?: true;
    workoutExerciseId?: true;
    commentType?: true;
    bodyPart?: true;
    side?: true;
    sensationType?: true;
    rawText?: true;
    createdAt?: true;
  };

  export type WorkoutCommentMaxAggregateInputType = {
    id?: true;
    workoutId?: true;
    workoutExerciseId?: true;
    commentType?: true;
    bodyPart?: true;
    side?: true;
    sensationType?: true;
    rawText?: true;
    createdAt?: true;
  };

  export type WorkoutCommentCountAggregateInputType = {
    id?: true;
    workoutId?: true;
    workoutExerciseId?: true;
    commentType?: true;
    bodyPart?: true;
    side?: true;
    sensationType?: true;
    rawText?: true;
    createdAt?: true;
    _all?: true;
  };

  export type WorkoutCommentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WorkoutComment to aggregate.
     */
    where?: WorkoutCommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutComments to fetch.
     */
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WorkoutCommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutComments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutComments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkoutComments
     **/
    _count?: true | WorkoutCommentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WorkoutCommentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WorkoutCommentMaxAggregateInputType;
  };

  export type GetWorkoutCommentAggregateType<T extends WorkoutCommentAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkoutComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkoutComment[P]>
      : GetScalarType<T[P], AggregateWorkoutComment[P]>;
  };

  export type WorkoutCommentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WorkoutCommentWhereInput;
    orderBy?:
      | WorkoutCommentOrderByWithAggregationInput
      | WorkoutCommentOrderByWithAggregationInput[];
    by: WorkoutCommentScalarFieldEnum[] | WorkoutCommentScalarFieldEnum;
    having?: WorkoutCommentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkoutCommentCountAggregateInputType | true;
    _min?: WorkoutCommentMinAggregateInputType;
    _max?: WorkoutCommentMaxAggregateInputType;
  };

  export type WorkoutCommentGroupByOutputType = {
    id: string;
    workoutId: string;
    workoutExerciseId: string | null;
    commentType: $Enums.CommentType;
    bodyPart: string | null;
    side: $Enums.BodySide | null;
    sensationType: $Enums.SensationType | null;
    rawText: string;
    createdAt: Date;
    _count: WorkoutCommentCountAggregateOutputType | null;
    _min: WorkoutCommentMinAggregateOutputType | null;
    _max: WorkoutCommentMaxAggregateOutputType | null;
  };

  type GetWorkoutCommentGroupByPayload<T extends WorkoutCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkoutCommentGroupByOutputType, T['by']> & {
        [P in keyof T & keyof WorkoutCommentGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], WorkoutCommentGroupByOutputType[P]>
          : GetScalarType<T[P], WorkoutCommentGroupByOutputType[P]>;
      }
    >
  >;

  export type WorkoutCommentSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      workoutExerciseId?: boolean;
      commentType?: boolean;
      bodyPart?: boolean;
      side?: boolean;
      sensationType?: boolean;
      rawText?: boolean;
      createdAt?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutComment']
  >;

  export type WorkoutCommentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      workoutExerciseId?: boolean;
      commentType?: boolean;
      bodyPart?: boolean;
      side?: boolean;
      sensationType?: boolean;
      rawText?: boolean;
      createdAt?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutComment']
  >;

  export type WorkoutCommentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      workoutId?: boolean;
      workoutExerciseId?: boolean;
      commentType?: boolean;
      bodyPart?: boolean;
      side?: boolean;
      sensationType?: boolean;
      rawText?: boolean;
      createdAt?: boolean;
      workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
      workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
    },
    ExtArgs['result']['workoutComment']
  >;

  export type WorkoutCommentSelectScalar = {
    id?: boolean;
    workoutId?: boolean;
    workoutExerciseId?: boolean;
    commentType?: boolean;
    bodyPart?: boolean;
    side?: boolean;
    sensationType?: boolean;
    rawText?: boolean;
    createdAt?: boolean;
  };

  export type WorkoutCommentOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'workoutId'
    | 'workoutExerciseId'
    | 'commentType'
    | 'bodyPart'
    | 'side'
    | 'sensationType'
    | 'rawText'
    | 'createdAt',
    ExtArgs['result']['workoutComment']
  >;
  export type WorkoutCommentInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
  };
  export type WorkoutCommentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
  };
  export type WorkoutCommentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    workout?: boolean | WorkoutDefaultArgs<ExtArgs>;
    workoutExercise?: boolean | WorkoutComment$workoutExerciseArgs<ExtArgs>;
  };

  export type $WorkoutCommentPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'WorkoutComment';
    objects: {
      workout: Prisma.$WorkoutPayload<ExtArgs>;
      workoutExercise: Prisma.$WorkoutExercisePayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        workoutId: string;
        workoutExerciseId: string | null;
        commentType: $Enums.CommentType;
        bodyPart: string | null;
        side: $Enums.BodySide | null;
        sensationType: $Enums.SensationType | null;
        rawText: string;
        createdAt: Date;
      },
      ExtArgs['result']['workoutComment']
    >;
    composites: {};
  };

  type WorkoutCommentGetPayload<S extends boolean | null | undefined | WorkoutCommentDefaultArgs> =
    $Result.GetResult<Prisma.$WorkoutCommentPayload, S>;

  type WorkoutCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkoutCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkoutCommentCountAggregateInputType | true;
    };

  export interface WorkoutCommentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['WorkoutComment'];
      meta: { name: 'WorkoutComment' };
    };
    /**
     * Find zero or one WorkoutComment that matches the filter.
     * @param {WorkoutCommentFindUniqueArgs} args - Arguments to find a WorkoutComment
     * @example
     * // Get one WorkoutComment
     * const workoutComment = await prisma.workoutComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkoutCommentFindUniqueArgs>(
      args: SelectSubset<T, WorkoutCommentFindUniqueArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one WorkoutComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkoutCommentFindUniqueOrThrowArgs} args - Arguments to find a WorkoutComment
     * @example
     * // Get one WorkoutComment
     * const workoutComment = await prisma.workoutComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkoutCommentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WorkoutCommentFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WorkoutComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentFindFirstArgs} args - Arguments to find a WorkoutComment
     * @example
     * // Get one WorkoutComment
     * const workoutComment = await prisma.workoutComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkoutCommentFindFirstArgs>(
      args?: SelectSubset<T, WorkoutCommentFindFirstArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WorkoutComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentFindFirstOrThrowArgs} args - Arguments to find a WorkoutComment
     * @example
     * // Get one WorkoutComment
     * const workoutComment = await prisma.workoutComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkoutCommentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkoutCommentFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more WorkoutComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkoutComments
     * const workoutComments = await prisma.workoutComment.findMany()
     *
     * // Get first 10 WorkoutComments
     * const workoutComments = await prisma.workoutComment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workoutCommentWithIdOnly = await prisma.workoutComment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkoutCommentFindManyArgs>(
      args?: SelectSubset<T, WorkoutCommentFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a WorkoutComment.
     * @param {WorkoutCommentCreateArgs} args - Arguments to create a WorkoutComment.
     * @example
     * // Create one WorkoutComment
     * const WorkoutComment = await prisma.workoutComment.create({
     *   data: {
     *     // ... data to create a WorkoutComment
     *   }
     * })
     *
     */
    create<T extends WorkoutCommentCreateArgs>(
      args: SelectSubset<T, WorkoutCommentCreateArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many WorkoutComments.
     * @param {WorkoutCommentCreateManyArgs} args - Arguments to create many WorkoutComments.
     * @example
     * // Create many WorkoutComments
     * const workoutComment = await prisma.workoutComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkoutCommentCreateManyArgs>(
      args?: SelectSubset<T, WorkoutCommentCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many WorkoutComments and returns the data saved in the database.
     * @param {WorkoutCommentCreateManyAndReturnArgs} args - Arguments to create many WorkoutComments.
     * @example
     * // Create many WorkoutComments
     * const workoutComment = await prisma.workoutComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkoutComments and only return the `id`
     * const workoutCommentWithIdOnly = await prisma.workoutComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkoutCommentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WorkoutCommentCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a WorkoutComment.
     * @param {WorkoutCommentDeleteArgs} args - Arguments to delete one WorkoutComment.
     * @example
     * // Delete one WorkoutComment
     * const WorkoutComment = await prisma.workoutComment.delete({
     *   where: {
     *     // ... filter to delete one WorkoutComment
     *   }
     * })
     *
     */
    delete<T extends WorkoutCommentDeleteArgs>(
      args: SelectSubset<T, WorkoutCommentDeleteArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one WorkoutComment.
     * @param {WorkoutCommentUpdateArgs} args - Arguments to update one WorkoutComment.
     * @example
     * // Update one WorkoutComment
     * const workoutComment = await prisma.workoutComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkoutCommentUpdateArgs>(
      args: SelectSubset<T, WorkoutCommentUpdateArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more WorkoutComments.
     * @param {WorkoutCommentDeleteManyArgs} args - Arguments to filter WorkoutComments to delete.
     * @example
     * // Delete a few WorkoutComments
     * const { count } = await prisma.workoutComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkoutCommentDeleteManyArgs>(
      args?: SelectSubset<T, WorkoutCommentDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WorkoutComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkoutComments
     * const workoutComment = await prisma.workoutComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkoutCommentUpdateManyArgs>(
      args: SelectSubset<T, WorkoutCommentUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WorkoutComments and returns the data updated in the database.
     * @param {WorkoutCommentUpdateManyAndReturnArgs} args - Arguments to update many WorkoutComments.
     * @example
     * // Update many WorkoutComments
     * const workoutComment = await prisma.workoutComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkoutComments and only return the `id`
     * const workoutCommentWithIdOnly = await prisma.workoutComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WorkoutCommentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WorkoutCommentUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WorkoutCommentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one WorkoutComment.
     * @param {WorkoutCommentUpsertArgs} args - Arguments to update or create a WorkoutComment.
     * @example
     * // Update or create a WorkoutComment
     * const workoutComment = await prisma.workoutComment.upsert({
     *   create: {
     *     // ... data to create a WorkoutComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkoutComment we want to update
     *   }
     * })
     */
    upsert<T extends WorkoutCommentUpsertArgs>(
      args: SelectSubset<T, WorkoutCommentUpsertArgs<ExtArgs>>,
    ): Prisma__WorkoutCommentClient<
      $Result.GetResult<Prisma.$WorkoutCommentPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of WorkoutComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentCountArgs} args - Arguments to filter WorkoutComments to count.
     * @example
     * // Count the number of WorkoutComments
     * const count = await prisma.workoutComment.count({
     *   where: {
     *     // ... the filter for the WorkoutComments we want to count
     *   }
     * })
     **/
    count<T extends WorkoutCommentCountArgs>(
      args?: Subset<T, WorkoutCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutCommentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a WorkoutComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WorkoutCommentAggregateArgs>(
      args: Subset<T, WorkoutCommentAggregateArgs>,
    ): Prisma.PrismaPromise<GetWorkoutCommentAggregateType<T>>;

    /**
     * Group by WorkoutComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WorkoutCommentGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutCommentGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WorkoutCommentGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetWorkoutCommentGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkoutComment model
     */
    readonly fields: WorkoutCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkoutComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkoutCommentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    workout<T extends WorkoutDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutDefaultArgs<ExtArgs>>,
    ): Prisma__WorkoutClient<
      | $Result.GetResult<
          Prisma.$WorkoutPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    workoutExercise<T extends WorkoutComment$workoutExerciseArgs<ExtArgs> = {}>(
      args?: Subset<T, WorkoutComment$workoutExerciseArgs<ExtArgs>>,
    ): Prisma__WorkoutExerciseClient<
      $Result.GetResult<
        Prisma.$WorkoutExercisePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the WorkoutComment model
   */
  interface WorkoutCommentFieldRefs {
    readonly id: FieldRef<'WorkoutComment', 'String'>;
    readonly workoutId: FieldRef<'WorkoutComment', 'String'>;
    readonly workoutExerciseId: FieldRef<'WorkoutComment', 'String'>;
    readonly commentType: FieldRef<'WorkoutComment', 'CommentType'>;
    readonly bodyPart: FieldRef<'WorkoutComment', 'String'>;
    readonly side: FieldRef<'WorkoutComment', 'BodySide'>;
    readonly sensationType: FieldRef<'WorkoutComment', 'SensationType'>;
    readonly rawText: FieldRef<'WorkoutComment', 'String'>;
    readonly createdAt: FieldRef<'WorkoutComment', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * WorkoutComment findUnique
   */
  export type WorkoutCommentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutComment to fetch.
     */
    where: WorkoutCommentWhereUniqueInput;
  };

  /**
   * WorkoutComment findUniqueOrThrow
   */
  export type WorkoutCommentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutComment to fetch.
     */
    where: WorkoutCommentWhereUniqueInput;
  };

  /**
   * WorkoutComment findFirst
   */
  export type WorkoutCommentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutComment to fetch.
     */
    where?: WorkoutCommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutComments to fetch.
     */
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkoutComments.
     */
    cursor?: WorkoutCommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutComments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutComments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkoutComments.
     */
    distinct?: WorkoutCommentScalarFieldEnum | WorkoutCommentScalarFieldEnum[];
  };

  /**
   * WorkoutComment findFirstOrThrow
   */
  export type WorkoutCommentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutComment to fetch.
     */
    where?: WorkoutCommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutComments to fetch.
     */
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkoutComments.
     */
    cursor?: WorkoutCommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutComments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutComments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkoutComments.
     */
    distinct?: WorkoutCommentScalarFieldEnum | WorkoutCommentScalarFieldEnum[];
  };

  /**
   * WorkoutComment findMany
   */
  export type WorkoutCommentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter, which WorkoutComments to fetch.
     */
    where?: WorkoutCommentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkoutComments to fetch.
     */
    orderBy?: WorkoutCommentOrderByWithRelationInput | WorkoutCommentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkoutComments.
     */
    cursor?: WorkoutCommentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkoutComments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkoutComments.
     */
    skip?: number;
    distinct?: WorkoutCommentScalarFieldEnum | WorkoutCommentScalarFieldEnum[];
  };

  /**
   * WorkoutComment create
   */
  export type WorkoutCommentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * The data needed to create a WorkoutComment.
     */
    data: XOR<WorkoutCommentCreateInput, WorkoutCommentUncheckedCreateInput>;
  };

  /**
   * WorkoutComment createMany
   */
  export type WorkoutCommentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many WorkoutComments.
     */
    data: WorkoutCommentCreateManyInput | WorkoutCommentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WorkoutComment createManyAndReturn
   */
  export type WorkoutCommentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkoutComments.
     */
    data: WorkoutCommentCreateManyInput | WorkoutCommentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * WorkoutComment update
   */
  export type WorkoutCommentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * The data needed to update a WorkoutComment.
     */
    data: XOR<WorkoutCommentUpdateInput, WorkoutCommentUncheckedUpdateInput>;
    /**
     * Choose, which WorkoutComment to update.
     */
    where: WorkoutCommentWhereUniqueInput;
  };

  /**
   * WorkoutComment updateMany
   */
  export type WorkoutCommentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update WorkoutComments.
     */
    data: XOR<WorkoutCommentUpdateManyMutationInput, WorkoutCommentUncheckedUpdateManyInput>;
    /**
     * Filter which WorkoutComments to update
     */
    where?: WorkoutCommentWhereInput;
    /**
     * Limit how many WorkoutComments to update.
     */
    limit?: number;
  };

  /**
   * WorkoutComment updateManyAndReturn
   */
  export type WorkoutCommentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * The data used to update WorkoutComments.
     */
    data: XOR<WorkoutCommentUpdateManyMutationInput, WorkoutCommentUncheckedUpdateManyInput>;
    /**
     * Filter which WorkoutComments to update
     */
    where?: WorkoutCommentWhereInput;
    /**
     * Limit how many WorkoutComments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * WorkoutComment upsert
   */
  export type WorkoutCommentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * The filter to search for the WorkoutComment to update in case it exists.
     */
    where: WorkoutCommentWhereUniqueInput;
    /**
     * In case the WorkoutComment found by the `where` argument doesn't exist, create a new WorkoutComment with this data.
     */
    create: XOR<WorkoutCommentCreateInput, WorkoutCommentUncheckedCreateInput>;
    /**
     * In case the WorkoutComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkoutCommentUpdateInput, WorkoutCommentUncheckedUpdateInput>;
  };

  /**
   * WorkoutComment delete
   */
  export type WorkoutCommentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
    /**
     * Filter which WorkoutComment to delete.
     */
    where: WorkoutCommentWhereUniqueInput;
  };

  /**
   * WorkoutComment deleteMany
   */
  export type WorkoutCommentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which WorkoutComments to delete
     */
    where?: WorkoutCommentWhereInput;
    /**
     * Limit how many WorkoutComments to delete.
     */
    limit?: number;
  };

  /**
   * WorkoutComment.workoutExercise
   */
  export type WorkoutComment$workoutExerciseArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutExercise
     */
    select?: WorkoutExerciseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutExercise
     */
    omit?: WorkoutExerciseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutExerciseInclude<ExtArgs> | null;
    where?: WorkoutExerciseWhereInput;
  };

  /**
   * WorkoutComment without action
   */
  export type WorkoutCommentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the WorkoutComment
     */
    select?: WorkoutCommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkoutComment
     */
    omit?: WorkoutCommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkoutCommentInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    telegramId: 'telegramId';
    telegramUsername: 'telegramUsername';
    email: 'email';
    passwordHash: 'passwordHash';
    displayName: 'displayName';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const AuthProviderScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    provider: 'provider';
    providerUserId: 'providerUserId';
    metadata: 'metadata';
    createdAt: 'createdAt';
  };

  export type AuthProviderScalarFieldEnum =
    (typeof AuthProviderScalarFieldEnum)[keyof typeof AuthProviderScalarFieldEnum];

  export const WorkoutScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    workoutDate: 'workoutDate';
    status: 'status';
    focus: 'focus';
    location: 'location';
    comment: 'comment';
    rawTranscript: 'rawTranscript';
    sourceMessageId: 'sourceMessageId';
    previewMessageId: 'previewMessageId';
    publishedMessageId: 'publishedMessageId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type WorkoutScalarFieldEnum =
    (typeof WorkoutScalarFieldEnum)[keyof typeof WorkoutScalarFieldEnum];

  export const ExerciseScalarFieldEnum: {
    id: 'id';
    canonicalName: 'canonicalName';
    displayNameRu: 'displayNameRu';
    displayNameEn: 'displayNameEn';
    movementPattern: 'movementPattern';
    equipment: 'equipment';
    primaryMuscles: 'primaryMuscles';
    secondaryMuscles: 'secondaryMuscles';
    level: 'level';
    instructions: 'instructions';
    exerciseType: 'exerciseType';
    category: 'category';
    isGlobal: 'isGlobal';
    createdBy: 'createdBy';
    createdAt: 'createdAt';
  };

  export type ExerciseScalarFieldEnum =
    (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum];

  export const ExerciseSynonymScalarFieldEnum: {
    id: 'id';
    exerciseId: 'exerciseId';
    synonym: 'synonym';
    language: 'language';
  };

  export type ExerciseSynonymScalarFieldEnum =
    (typeof ExerciseSynonymScalarFieldEnum)[keyof typeof ExerciseSynonymScalarFieldEnum];

  export const UserExerciseMappingScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    inputText: 'inputText';
    exerciseId: 'exerciseId';
    useCount: 'useCount';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserExerciseMappingScalarFieldEnum =
    (typeof UserExerciseMappingScalarFieldEnum)[keyof typeof UserExerciseMappingScalarFieldEnum];

  export const WorkoutExerciseScalarFieldEnum: {
    id: 'id';
    workoutId: 'workoutId';
    exerciseId: 'exerciseId';
    sortOrder: 'sortOrder';
  };

  export type WorkoutExerciseScalarFieldEnum =
    (typeof WorkoutExerciseScalarFieldEnum)[keyof typeof WorkoutExerciseScalarFieldEnum];

  export const ExerciseSetScalarFieldEnum: {
    id: 'id';
    workoutExerciseId: 'workoutExerciseId';
    setNumber: 'setNumber';
    reps: 'reps';
    weight: 'weight';
    unit: 'unit';
  };

  export type ExerciseSetScalarFieldEnum =
    (typeof ExerciseSetScalarFieldEnum)[keyof typeof ExerciseSetScalarFieldEnum];

  export const WorkoutCommentScalarFieldEnum: {
    id: 'id';
    workoutId: 'workoutId';
    workoutExerciseId: 'workoutExerciseId';
    commentType: 'commentType';
    bodyPart: 'bodyPart';
    side: 'side';
    sensationType: 'sensationType';
    rawText: 'rawText';
    createdAt: 'createdAt';
  };

  export type WorkoutCommentScalarFieldEnum =
    (typeof WorkoutCommentScalarFieldEnum)[keyof typeof WorkoutCommentScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'WorkoutStatus'
   */
  export type EnumWorkoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'WorkoutStatus'
  >;

  /**
   * Reference to a field of type 'WorkoutStatus[]'
   */
  export type ListEnumWorkoutStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'WorkoutStatus[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'ExerciseCategory'
   */
  export type EnumExerciseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ExerciseCategory'
  >;

  /**
   * Reference to a field of type 'ExerciseCategory[]'
   */
  export type ListEnumExerciseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'ExerciseCategory[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;

  /**
   * Reference to a field of type 'WeightUnit'
   */
  export type EnumWeightUnitFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'WeightUnit'
  >;

  /**
   * Reference to a field of type 'WeightUnit[]'
   */
  export type ListEnumWeightUnitFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'WeightUnit[]'
  >;

  /**
   * Reference to a field of type 'CommentType'
   */
  export type EnumCommentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'CommentType'
  >;

  /**
   * Reference to a field of type 'CommentType[]'
   */
  export type ListEnumCommentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'CommentType[]'
  >;

  /**
   * Reference to a field of type 'BodySide'
   */
  export type EnumBodySideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BodySide'>;

  /**
   * Reference to a field of type 'BodySide[]'
   */
  export type ListEnumBodySideFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'BodySide[]'
  >;

  /**
   * Reference to a field of type 'SensationType'
   */
  export type EnumSensationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'SensationType'
  >;

  /**
   * Reference to a field of type 'SensationType[]'
   */
  export type ListEnumSensationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'SensationType[]'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: UuidFilter<'User'> | string;
    telegramId?: StringNullableFilter<'User'> | string | null;
    telegramUsername?: StringNullableFilter<'User'> | string | null;
    email?: StringNullableFilter<'User'> | string | null;
    passwordHash?: StringNullableFilter<'User'> | string | null;
    displayName?: StringNullableFilter<'User'> | string | null;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    authProviders?: AuthProviderListRelationFilter;
    workouts?: WorkoutListRelationFilter;
    exerciseMappings?: UserExerciseMappingListRelationFilter;
    createdExercises?: ExerciseListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    telegramId?: SortOrderInput | SortOrder;
    telegramUsername?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    passwordHash?: SortOrderInput | SortOrder;
    displayName?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    authProviders?: AuthProviderOrderByRelationAggregateInput;
    workouts?: WorkoutOrderByRelationAggregateInput;
    exerciseMappings?: UserExerciseMappingOrderByRelationAggregateInput;
    createdExercises?: ExerciseOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      telegramId?: StringNullableFilter<'User'> | string | null;
      telegramUsername?: StringNullableFilter<'User'> | string | null;
      passwordHash?: StringNullableFilter<'User'> | string | null;
      displayName?: StringNullableFilter<'User'> | string | null;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      authProviders?: AuthProviderListRelationFilter;
      workouts?: WorkoutListRelationFilter;
      exerciseMappings?: UserExerciseMappingListRelationFilter;
      createdExercises?: ExerciseListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    telegramId?: SortOrderInput | SortOrder;
    telegramUsername?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    passwordHash?: SortOrderInput | SortOrder;
    displayName?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'User'> | string;
    telegramId?: StringNullableWithAggregatesFilter<'User'> | string | null;
    telegramUsername?: StringNullableWithAggregatesFilter<'User'> | string | null;
    email?: StringNullableWithAggregatesFilter<'User'> | string | null;
    passwordHash?: StringNullableWithAggregatesFilter<'User'> | string | null;
    displayName?: StringNullableWithAggregatesFilter<'User'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type AuthProviderWhereInput = {
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[];
    OR?: AuthProviderWhereInput[];
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[];
    id?: UuidFilter<'AuthProvider'> | string;
    userId?: UuidFilter<'AuthProvider'> | string;
    provider?: StringFilter<'AuthProvider'> | string;
    providerUserId?: StringFilter<'AuthProvider'> | string;
    metadata?: JsonNullableFilter<'AuthProvider'>;
    createdAt?: DateTimeFilter<'AuthProvider'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AuthProviderOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    provider?: SortOrder;
    providerUserId?: SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AuthProviderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      provider_providerUserId?: AuthProviderProviderProviderUserIdCompoundUniqueInput;
      AND?: AuthProviderWhereInput | AuthProviderWhereInput[];
      OR?: AuthProviderWhereInput[];
      NOT?: AuthProviderWhereInput | AuthProviderWhereInput[];
      userId?: UuidFilter<'AuthProvider'> | string;
      provider?: StringFilter<'AuthProvider'> | string;
      providerUserId?: StringFilter<'AuthProvider'> | string;
      metadata?: JsonNullableFilter<'AuthProvider'>;
      createdAt?: DateTimeFilter<'AuthProvider'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'provider_providerUserId'
  >;

  export type AuthProviderOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    provider?: SortOrder;
    providerUserId?: SortOrder;
    metadata?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: AuthProviderCountOrderByAggregateInput;
    _max?: AuthProviderMaxOrderByAggregateInput;
    _min?: AuthProviderMinOrderByAggregateInput;
  };

  export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[];
    OR?: AuthProviderScalarWhereWithAggregatesInput[];
    NOT?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'AuthProvider'> | string;
    userId?: UuidWithAggregatesFilter<'AuthProvider'> | string;
    provider?: StringWithAggregatesFilter<'AuthProvider'> | string;
    providerUserId?: StringWithAggregatesFilter<'AuthProvider'> | string;
    metadata?: JsonNullableWithAggregatesFilter<'AuthProvider'>;
    createdAt?: DateTimeWithAggregatesFilter<'AuthProvider'> | Date | string;
  };

  export type WorkoutWhereInput = {
    AND?: WorkoutWhereInput | WorkoutWhereInput[];
    OR?: WorkoutWhereInput[];
    NOT?: WorkoutWhereInput | WorkoutWhereInput[];
    id?: UuidFilter<'Workout'> | string;
    userId?: UuidFilter<'Workout'> | string;
    workoutDate?: DateTimeFilter<'Workout'> | Date | string;
    status?: EnumWorkoutStatusFilter<'Workout'> | $Enums.WorkoutStatus;
    focus?: StringNullableListFilter<'Workout'>;
    location?: StringNullableFilter<'Workout'> | string | null;
    comment?: StringNullableFilter<'Workout'> | string | null;
    rawTranscript?: StringNullableFilter<'Workout'> | string | null;
    sourceMessageId?: IntNullableFilter<'Workout'> | number | null;
    previewMessageId?: IntNullableFilter<'Workout'> | number | null;
    publishedMessageId?: IntNullableFilter<'Workout'> | number | null;
    createdAt?: DateTimeFilter<'Workout'> | Date | string;
    updatedAt?: DateTimeFilter<'Workout'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    workoutExercises?: WorkoutExerciseListRelationFilter;
    comments?: WorkoutCommentListRelationFilter;
  };

  export type WorkoutOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    workoutDate?: SortOrder;
    status?: SortOrder;
    focus?: SortOrder;
    location?: SortOrderInput | SortOrder;
    comment?: SortOrderInput | SortOrder;
    rawTranscript?: SortOrderInput | SortOrder;
    sourceMessageId?: SortOrderInput | SortOrder;
    previewMessageId?: SortOrderInput | SortOrder;
    publishedMessageId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    workoutExercises?: WorkoutExerciseOrderByRelationAggregateInput;
    comments?: WorkoutCommentOrderByRelationAggregateInput;
  };

  export type WorkoutWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: WorkoutWhereInput | WorkoutWhereInput[];
      OR?: WorkoutWhereInput[];
      NOT?: WorkoutWhereInput | WorkoutWhereInput[];
      userId?: UuidFilter<'Workout'> | string;
      workoutDate?: DateTimeFilter<'Workout'> | Date | string;
      status?: EnumWorkoutStatusFilter<'Workout'> | $Enums.WorkoutStatus;
      focus?: StringNullableListFilter<'Workout'>;
      location?: StringNullableFilter<'Workout'> | string | null;
      comment?: StringNullableFilter<'Workout'> | string | null;
      rawTranscript?: StringNullableFilter<'Workout'> | string | null;
      sourceMessageId?: IntNullableFilter<'Workout'> | number | null;
      previewMessageId?: IntNullableFilter<'Workout'> | number | null;
      publishedMessageId?: IntNullableFilter<'Workout'> | number | null;
      createdAt?: DateTimeFilter<'Workout'> | Date | string;
      updatedAt?: DateTimeFilter<'Workout'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      workoutExercises?: WorkoutExerciseListRelationFilter;
      comments?: WorkoutCommentListRelationFilter;
    },
    'id'
  >;

  export type WorkoutOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    workoutDate?: SortOrder;
    status?: SortOrder;
    focus?: SortOrder;
    location?: SortOrderInput | SortOrder;
    comment?: SortOrderInput | SortOrder;
    rawTranscript?: SortOrderInput | SortOrder;
    sourceMessageId?: SortOrderInput | SortOrder;
    previewMessageId?: SortOrderInput | SortOrder;
    publishedMessageId?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: WorkoutCountOrderByAggregateInput;
    _avg?: WorkoutAvgOrderByAggregateInput;
    _max?: WorkoutMaxOrderByAggregateInput;
    _min?: WorkoutMinOrderByAggregateInput;
    _sum?: WorkoutSumOrderByAggregateInput;
  };

  export type WorkoutScalarWhereWithAggregatesInput = {
    AND?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[];
    OR?: WorkoutScalarWhereWithAggregatesInput[];
    NOT?: WorkoutScalarWhereWithAggregatesInput | WorkoutScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Workout'> | string;
    userId?: UuidWithAggregatesFilter<'Workout'> | string;
    workoutDate?: DateTimeWithAggregatesFilter<'Workout'> | Date | string;
    status?: EnumWorkoutStatusWithAggregatesFilter<'Workout'> | $Enums.WorkoutStatus;
    focus?: StringNullableListFilter<'Workout'>;
    location?: StringNullableWithAggregatesFilter<'Workout'> | string | null;
    comment?: StringNullableWithAggregatesFilter<'Workout'> | string | null;
    rawTranscript?: StringNullableWithAggregatesFilter<'Workout'> | string | null;
    sourceMessageId?: IntNullableWithAggregatesFilter<'Workout'> | number | null;
    previewMessageId?: IntNullableWithAggregatesFilter<'Workout'> | number | null;
    publishedMessageId?: IntNullableWithAggregatesFilter<'Workout'> | number | null;
    createdAt?: DateTimeWithAggregatesFilter<'Workout'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Workout'> | Date | string;
  };

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[];
    OR?: ExerciseWhereInput[];
    NOT?: ExerciseWhereInput | ExerciseWhereInput[];
    id?: UuidFilter<'Exercise'> | string;
    canonicalName?: StringFilter<'Exercise'> | string;
    displayNameRu?: StringNullableFilter<'Exercise'> | string | null;
    displayNameEn?: StringNullableFilter<'Exercise'> | string | null;
    movementPattern?: StringNullableFilter<'Exercise'> | string | null;
    equipment?: StringNullableFilter<'Exercise'> | string | null;
    primaryMuscles?: StringNullableListFilter<'Exercise'>;
    secondaryMuscles?: StringNullableListFilter<'Exercise'>;
    level?: StringNullableFilter<'Exercise'> | string | null;
    instructions?: StringNullableListFilter<'Exercise'>;
    exerciseType?: StringNullableFilter<'Exercise'> | string | null;
    category?: EnumExerciseCategoryNullableFilter<'Exercise'> | $Enums.ExerciseCategory | null;
    isGlobal?: BoolFilter<'Exercise'> | boolean;
    createdBy?: UuidNullableFilter<'Exercise'> | string | null;
    createdAt?: DateTimeFilter<'Exercise'> | Date | string;
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
    synonyms?: ExerciseSynonymListRelationFilter;
    workoutExercises?: WorkoutExerciseListRelationFilter;
    userMappings?: UserExerciseMappingListRelationFilter;
  };

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder;
    canonicalName?: SortOrder;
    displayNameRu?: SortOrderInput | SortOrder;
    displayNameEn?: SortOrderInput | SortOrder;
    movementPattern?: SortOrderInput | SortOrder;
    equipment?: SortOrderInput | SortOrder;
    primaryMuscles?: SortOrder;
    secondaryMuscles?: SortOrder;
    level?: SortOrderInput | SortOrder;
    instructions?: SortOrder;
    exerciseType?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    isGlobal?: SortOrder;
    createdBy?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    creator?: UserOrderByWithRelationInput;
    synonyms?: ExerciseSynonymOrderByRelationAggregateInput;
    workoutExercises?: WorkoutExerciseOrderByRelationAggregateInput;
    userMappings?: UserExerciseMappingOrderByRelationAggregateInput;
  };

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      canonicalName?: string;
      AND?: ExerciseWhereInput | ExerciseWhereInput[];
      OR?: ExerciseWhereInput[];
      NOT?: ExerciseWhereInput | ExerciseWhereInput[];
      displayNameRu?: StringNullableFilter<'Exercise'> | string | null;
      displayNameEn?: StringNullableFilter<'Exercise'> | string | null;
      movementPattern?: StringNullableFilter<'Exercise'> | string | null;
      equipment?: StringNullableFilter<'Exercise'> | string | null;
      primaryMuscles?: StringNullableListFilter<'Exercise'>;
      secondaryMuscles?: StringNullableListFilter<'Exercise'>;
      level?: StringNullableFilter<'Exercise'> | string | null;
      instructions?: StringNullableListFilter<'Exercise'>;
      exerciseType?: StringNullableFilter<'Exercise'> | string | null;
      category?: EnumExerciseCategoryNullableFilter<'Exercise'> | $Enums.ExerciseCategory | null;
      isGlobal?: BoolFilter<'Exercise'> | boolean;
      createdBy?: UuidNullableFilter<'Exercise'> | string | null;
      createdAt?: DateTimeFilter<'Exercise'> | Date | string;
      creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null;
      synonyms?: ExerciseSynonymListRelationFilter;
      workoutExercises?: WorkoutExerciseListRelationFilter;
      userMappings?: UserExerciseMappingListRelationFilter;
    },
    'id' | 'canonicalName'
  >;

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder;
    canonicalName?: SortOrder;
    displayNameRu?: SortOrderInput | SortOrder;
    displayNameEn?: SortOrderInput | SortOrder;
    movementPattern?: SortOrderInput | SortOrder;
    equipment?: SortOrderInput | SortOrder;
    primaryMuscles?: SortOrder;
    secondaryMuscles?: SortOrder;
    level?: SortOrderInput | SortOrder;
    instructions?: SortOrder;
    exerciseType?: SortOrderInput | SortOrder;
    category?: SortOrderInput | SortOrder;
    isGlobal?: SortOrder;
    createdBy?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: ExerciseCountOrderByAggregateInput;
    _max?: ExerciseMaxOrderByAggregateInput;
    _min?: ExerciseMinOrderByAggregateInput;
  };

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[];
    OR?: ExerciseScalarWhereWithAggregatesInput[];
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Exercise'> | string;
    canonicalName?: StringWithAggregatesFilter<'Exercise'> | string;
    displayNameRu?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    displayNameEn?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    movementPattern?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    equipment?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    primaryMuscles?: StringNullableListFilter<'Exercise'>;
    secondaryMuscles?: StringNullableListFilter<'Exercise'>;
    level?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    instructions?: StringNullableListFilter<'Exercise'>;
    exerciseType?: StringNullableWithAggregatesFilter<'Exercise'> | string | null;
    category?:
      | EnumExerciseCategoryNullableWithAggregatesFilter<'Exercise'>
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolWithAggregatesFilter<'Exercise'> | boolean;
    createdBy?: UuidNullableWithAggregatesFilter<'Exercise'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Exercise'> | Date | string;
  };

  export type ExerciseSynonymWhereInput = {
    AND?: ExerciseSynonymWhereInput | ExerciseSynonymWhereInput[];
    OR?: ExerciseSynonymWhereInput[];
    NOT?: ExerciseSynonymWhereInput | ExerciseSynonymWhereInput[];
    id?: UuidFilter<'ExerciseSynonym'> | string;
    exerciseId?: UuidFilter<'ExerciseSynonym'> | string;
    synonym?: StringFilter<'ExerciseSynonym'> | string;
    language?: StringFilter<'ExerciseSynonym'> | string;
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
  };

  export type ExerciseSynonymOrderByWithRelationInput = {
    id?: SortOrder;
    exerciseId?: SortOrder;
    synonym?: SortOrder;
    language?: SortOrder;
    exercise?: ExerciseOrderByWithRelationInput;
  };

  export type ExerciseSynonymWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ExerciseSynonymWhereInput | ExerciseSynonymWhereInput[];
      OR?: ExerciseSynonymWhereInput[];
      NOT?: ExerciseSynonymWhereInput | ExerciseSynonymWhereInput[];
      exerciseId?: UuidFilter<'ExerciseSynonym'> | string;
      synonym?: StringFilter<'ExerciseSynonym'> | string;
      language?: StringFilter<'ExerciseSynonym'> | string;
      exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
    },
    'id'
  >;

  export type ExerciseSynonymOrderByWithAggregationInput = {
    id?: SortOrder;
    exerciseId?: SortOrder;
    synonym?: SortOrder;
    language?: SortOrder;
    _count?: ExerciseSynonymCountOrderByAggregateInput;
    _max?: ExerciseSynonymMaxOrderByAggregateInput;
    _min?: ExerciseSynonymMinOrderByAggregateInput;
  };

  export type ExerciseSynonymScalarWhereWithAggregatesInput = {
    AND?:
      | ExerciseSynonymScalarWhereWithAggregatesInput
      | ExerciseSynonymScalarWhereWithAggregatesInput[];
    OR?: ExerciseSynonymScalarWhereWithAggregatesInput[];
    NOT?:
      | ExerciseSynonymScalarWhereWithAggregatesInput
      | ExerciseSynonymScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'ExerciseSynonym'> | string;
    exerciseId?: UuidWithAggregatesFilter<'ExerciseSynonym'> | string;
    synonym?: StringWithAggregatesFilter<'ExerciseSynonym'> | string;
    language?: StringWithAggregatesFilter<'ExerciseSynonym'> | string;
  };

  export type UserExerciseMappingWhereInput = {
    AND?: UserExerciseMappingWhereInput | UserExerciseMappingWhereInput[];
    OR?: UserExerciseMappingWhereInput[];
    NOT?: UserExerciseMappingWhereInput | UserExerciseMappingWhereInput[];
    id?: UuidFilter<'UserExerciseMapping'> | string;
    userId?: UuidFilter<'UserExerciseMapping'> | string;
    inputText?: StringFilter<'UserExerciseMapping'> | string;
    exerciseId?: UuidFilter<'UserExerciseMapping'> | string;
    useCount?: IntFilter<'UserExerciseMapping'> | number;
    createdAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
    updatedAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
  };

  export type UserExerciseMappingOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    inputText?: SortOrder;
    exerciseId?: SortOrder;
    useCount?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    exercise?: ExerciseOrderByWithRelationInput;
  };

  export type UserExerciseMappingWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: UserExerciseMappingWhereInput | UserExerciseMappingWhereInput[];
      OR?: UserExerciseMappingWhereInput[];
      NOT?: UserExerciseMappingWhereInput | UserExerciseMappingWhereInput[];
      userId?: UuidFilter<'UserExerciseMapping'> | string;
      inputText?: StringFilter<'UserExerciseMapping'> | string;
      exerciseId?: UuidFilter<'UserExerciseMapping'> | string;
      useCount?: IntFilter<'UserExerciseMapping'> | number;
      createdAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
      updatedAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
    },
    'id'
  >;

  export type UserExerciseMappingOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    inputText?: SortOrder;
    exerciseId?: SortOrder;
    useCount?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserExerciseMappingCountOrderByAggregateInput;
    _avg?: UserExerciseMappingAvgOrderByAggregateInput;
    _max?: UserExerciseMappingMaxOrderByAggregateInput;
    _min?: UserExerciseMappingMinOrderByAggregateInput;
    _sum?: UserExerciseMappingSumOrderByAggregateInput;
  };

  export type UserExerciseMappingScalarWhereWithAggregatesInput = {
    AND?:
      | UserExerciseMappingScalarWhereWithAggregatesInput
      | UserExerciseMappingScalarWhereWithAggregatesInput[];
    OR?: UserExerciseMappingScalarWhereWithAggregatesInput[];
    NOT?:
      | UserExerciseMappingScalarWhereWithAggregatesInput
      | UserExerciseMappingScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'UserExerciseMapping'> | string;
    userId?: UuidWithAggregatesFilter<'UserExerciseMapping'> | string;
    inputText?: StringWithAggregatesFilter<'UserExerciseMapping'> | string;
    exerciseId?: UuidWithAggregatesFilter<'UserExerciseMapping'> | string;
    useCount?: IntWithAggregatesFilter<'UserExerciseMapping'> | number;
    createdAt?: DateTimeWithAggregatesFilter<'UserExerciseMapping'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'UserExerciseMapping'> | Date | string;
  };

  export type WorkoutExerciseWhereInput = {
    AND?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[];
    OR?: WorkoutExerciseWhereInput[];
    NOT?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[];
    id?: UuidFilter<'WorkoutExercise'> | string;
    workoutId?: UuidFilter<'WorkoutExercise'> | string;
    exerciseId?: UuidFilter<'WorkoutExercise'> | string;
    sortOrder?: IntFilter<'WorkoutExercise'> | number;
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>;
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
    sets?: ExerciseSetListRelationFilter;
    comments?: WorkoutCommentListRelationFilter;
  };

  export type WorkoutExerciseOrderByWithRelationInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    exerciseId?: SortOrder;
    sortOrder?: SortOrder;
    workout?: WorkoutOrderByWithRelationInput;
    exercise?: ExerciseOrderByWithRelationInput;
    sets?: ExerciseSetOrderByRelationAggregateInput;
    comments?: WorkoutCommentOrderByRelationAggregateInput;
  };

  export type WorkoutExerciseWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[];
      OR?: WorkoutExerciseWhereInput[];
      NOT?: WorkoutExerciseWhereInput | WorkoutExerciseWhereInput[];
      workoutId?: UuidFilter<'WorkoutExercise'> | string;
      exerciseId?: UuidFilter<'WorkoutExercise'> | string;
      sortOrder?: IntFilter<'WorkoutExercise'> | number;
      workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>;
      exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>;
      sets?: ExerciseSetListRelationFilter;
      comments?: WorkoutCommentListRelationFilter;
    },
    'id'
  >;

  export type WorkoutExerciseOrderByWithAggregationInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    exerciseId?: SortOrder;
    sortOrder?: SortOrder;
    _count?: WorkoutExerciseCountOrderByAggregateInput;
    _avg?: WorkoutExerciseAvgOrderByAggregateInput;
    _max?: WorkoutExerciseMaxOrderByAggregateInput;
    _min?: WorkoutExerciseMinOrderByAggregateInput;
    _sum?: WorkoutExerciseSumOrderByAggregateInput;
  };

  export type WorkoutExerciseScalarWhereWithAggregatesInput = {
    AND?:
      | WorkoutExerciseScalarWhereWithAggregatesInput
      | WorkoutExerciseScalarWhereWithAggregatesInput[];
    OR?: WorkoutExerciseScalarWhereWithAggregatesInput[];
    NOT?:
      | WorkoutExerciseScalarWhereWithAggregatesInput
      | WorkoutExerciseScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'WorkoutExercise'> | string;
    workoutId?: UuidWithAggregatesFilter<'WorkoutExercise'> | string;
    exerciseId?: UuidWithAggregatesFilter<'WorkoutExercise'> | string;
    sortOrder?: IntWithAggregatesFilter<'WorkoutExercise'> | number;
  };

  export type ExerciseSetWhereInput = {
    AND?: ExerciseSetWhereInput | ExerciseSetWhereInput[];
    OR?: ExerciseSetWhereInput[];
    NOT?: ExerciseSetWhereInput | ExerciseSetWhereInput[];
    id?: UuidFilter<'ExerciseSet'> | string;
    workoutExerciseId?: UuidFilter<'ExerciseSet'> | string;
    setNumber?: IntFilter<'ExerciseSet'> | number;
    reps?: IntFilter<'ExerciseSet'> | number;
    weight?:
      | DecimalNullableFilter<'ExerciseSet'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFilter<'ExerciseSet'> | $Enums.WeightUnit;
    workoutExercise?: XOR<WorkoutExerciseScalarRelationFilter, WorkoutExerciseWhereInput>;
  };

  export type ExerciseSetOrderByWithRelationInput = {
    id?: SortOrder;
    workoutExerciseId?: SortOrder;
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    unit?: SortOrder;
    workoutExercise?: WorkoutExerciseOrderByWithRelationInput;
  };

  export type ExerciseSetWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ExerciseSetWhereInput | ExerciseSetWhereInput[];
      OR?: ExerciseSetWhereInput[];
      NOT?: ExerciseSetWhereInput | ExerciseSetWhereInput[];
      workoutExerciseId?: UuidFilter<'ExerciseSet'> | string;
      setNumber?: IntFilter<'ExerciseSet'> | number;
      reps?: IntFilter<'ExerciseSet'> | number;
      weight?:
        | DecimalNullableFilter<'ExerciseSet'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      unit?: EnumWeightUnitFilter<'ExerciseSet'> | $Enums.WeightUnit;
      workoutExercise?: XOR<WorkoutExerciseScalarRelationFilter, WorkoutExerciseWhereInput>;
    },
    'id'
  >;

  export type ExerciseSetOrderByWithAggregationInput = {
    id?: SortOrder;
    workoutExerciseId?: SortOrder;
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrderInput | SortOrder;
    unit?: SortOrder;
    _count?: ExerciseSetCountOrderByAggregateInput;
    _avg?: ExerciseSetAvgOrderByAggregateInput;
    _max?: ExerciseSetMaxOrderByAggregateInput;
    _min?: ExerciseSetMinOrderByAggregateInput;
    _sum?: ExerciseSetSumOrderByAggregateInput;
  };

  export type ExerciseSetScalarWhereWithAggregatesInput = {
    AND?: ExerciseSetScalarWhereWithAggregatesInput | ExerciseSetScalarWhereWithAggregatesInput[];
    OR?: ExerciseSetScalarWhereWithAggregatesInput[];
    NOT?: ExerciseSetScalarWhereWithAggregatesInput | ExerciseSetScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'ExerciseSet'> | string;
    workoutExerciseId?: UuidWithAggregatesFilter<'ExerciseSet'> | string;
    setNumber?: IntWithAggregatesFilter<'ExerciseSet'> | number;
    reps?: IntWithAggregatesFilter<'ExerciseSet'> | number;
    weight?:
      | DecimalNullableWithAggregatesFilter<'ExerciseSet'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitWithAggregatesFilter<'ExerciseSet'> | $Enums.WeightUnit;
  };

  export type WorkoutCommentWhereInput = {
    AND?: WorkoutCommentWhereInput | WorkoutCommentWhereInput[];
    OR?: WorkoutCommentWhereInput[];
    NOT?: WorkoutCommentWhereInput | WorkoutCommentWhereInput[];
    id?: UuidFilter<'WorkoutComment'> | string;
    workoutId?: UuidFilter<'WorkoutComment'> | string;
    workoutExerciseId?: UuidNullableFilter<'WorkoutComment'> | string | null;
    commentType?: EnumCommentTypeFilter<'WorkoutComment'> | $Enums.CommentType;
    bodyPart?: StringNullableFilter<'WorkoutComment'> | string | null;
    side?: EnumBodySideNullableFilter<'WorkoutComment'> | $Enums.BodySide | null;
    sensationType?: EnumSensationTypeNullableFilter<'WorkoutComment'> | $Enums.SensationType | null;
    rawText?: StringFilter<'WorkoutComment'> | string;
    createdAt?: DateTimeFilter<'WorkoutComment'> | Date | string;
    workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>;
    workoutExercise?: XOR<
      WorkoutExerciseNullableScalarRelationFilter,
      WorkoutExerciseWhereInput
    > | null;
  };

  export type WorkoutCommentOrderByWithRelationInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    workoutExerciseId?: SortOrderInput | SortOrder;
    commentType?: SortOrder;
    bodyPart?: SortOrderInput | SortOrder;
    side?: SortOrderInput | SortOrder;
    sensationType?: SortOrderInput | SortOrder;
    rawText?: SortOrder;
    createdAt?: SortOrder;
    workout?: WorkoutOrderByWithRelationInput;
    workoutExercise?: WorkoutExerciseOrderByWithRelationInput;
  };

  export type WorkoutCommentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: WorkoutCommentWhereInput | WorkoutCommentWhereInput[];
      OR?: WorkoutCommentWhereInput[];
      NOT?: WorkoutCommentWhereInput | WorkoutCommentWhereInput[];
      workoutId?: UuidFilter<'WorkoutComment'> | string;
      workoutExerciseId?: UuidNullableFilter<'WorkoutComment'> | string | null;
      commentType?: EnumCommentTypeFilter<'WorkoutComment'> | $Enums.CommentType;
      bodyPart?: StringNullableFilter<'WorkoutComment'> | string | null;
      side?: EnumBodySideNullableFilter<'WorkoutComment'> | $Enums.BodySide | null;
      sensationType?:
        | EnumSensationTypeNullableFilter<'WorkoutComment'>
        | $Enums.SensationType
        | null;
      rawText?: StringFilter<'WorkoutComment'> | string;
      createdAt?: DateTimeFilter<'WorkoutComment'> | Date | string;
      workout?: XOR<WorkoutScalarRelationFilter, WorkoutWhereInput>;
      workoutExercise?: XOR<
        WorkoutExerciseNullableScalarRelationFilter,
        WorkoutExerciseWhereInput
      > | null;
    },
    'id'
  >;

  export type WorkoutCommentOrderByWithAggregationInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    workoutExerciseId?: SortOrderInput | SortOrder;
    commentType?: SortOrder;
    bodyPart?: SortOrderInput | SortOrder;
    side?: SortOrderInput | SortOrder;
    sensationType?: SortOrderInput | SortOrder;
    rawText?: SortOrder;
    createdAt?: SortOrder;
    _count?: WorkoutCommentCountOrderByAggregateInput;
    _max?: WorkoutCommentMaxOrderByAggregateInput;
    _min?: WorkoutCommentMinOrderByAggregateInput;
  };

  export type WorkoutCommentScalarWhereWithAggregatesInput = {
    AND?:
      | WorkoutCommentScalarWhereWithAggregatesInput
      | WorkoutCommentScalarWhereWithAggregatesInput[];
    OR?: WorkoutCommentScalarWhereWithAggregatesInput[];
    NOT?:
      | WorkoutCommentScalarWhereWithAggregatesInput
      | WorkoutCommentScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'WorkoutComment'> | string;
    workoutId?: UuidWithAggregatesFilter<'WorkoutComment'> | string;
    workoutExerciseId?: UuidNullableWithAggregatesFilter<'WorkoutComment'> | string | null;
    commentType?: EnumCommentTypeWithAggregatesFilter<'WorkoutComment'> | $Enums.CommentType;
    bodyPart?: StringNullableWithAggregatesFilter<'WorkoutComment'> | string | null;
    side?: EnumBodySideNullableWithAggregatesFilter<'WorkoutComment'> | $Enums.BodySide | null;
    sensationType?:
      | EnumSensationTypeNullableWithAggregatesFilter<'WorkoutComment'>
      | $Enums.SensationType
      | null;
    rawText?: StringWithAggregatesFilter<'WorkoutComment'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'WorkoutComment'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderCreateNestedManyWithoutUserInput;
    workouts?: WorkoutCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseCreateNestedManyWithoutCreatorInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUpdateManyWithoutCreatorNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUncheckedUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthProviderCreateInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutAuthProvidersInput;
  };

  export type AuthProviderUncheckedCreateInput = {
    id?: string;
    userId: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type AuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAuthProvidersNestedInput;
  };

  export type AuthProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthProviderCreateManyInput = {
    id?: string;
    userId: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type AuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutCreateInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutWorkoutsInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutUncheckedCreateInput = {
    id?: string;
    userId: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutWorkoutsNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutCreateManyInput = {
    id?: string;
    userId: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WorkoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseCreateInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    creator?: UserCreateNestedOneWithoutCreatedExercisesInput;
    synonyms?: ExerciseSynonymCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUncheckedCreateInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdBy?: string | null;
    createdAt?: Date | string;
    synonyms?: ExerciseSynonymUncheckedCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    creator?: UserUpdateOneWithoutCreatedExercisesNestedInput;
    synonyms?: ExerciseSynonymUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    synonyms?: ExerciseSynonymUncheckedUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUncheckedUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseCreateManyInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdBy?: string | null;
    createdAt?: Date | string;
  };

  export type ExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseSynonymCreateInput = {
    id?: string;
    synonym: string;
    language: string;
    exercise: ExerciseCreateNestedOneWithoutSynonymsInput;
  };

  export type ExerciseSynonymUncheckedCreateInput = {
    id?: string;
    exerciseId: string;
    synonym: string;
    language: string;
  };

  export type ExerciseSynonymUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
    exercise?: ExerciseUpdateOneRequiredWithoutSynonymsNestedInput;
  };

  export type ExerciseSynonymUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type ExerciseSynonymCreateManyInput = {
    id?: string;
    exerciseId: string;
    synonym: string;
    language: string;
  };

  export type ExerciseSynonymUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type ExerciseSynonymUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type UserExerciseMappingCreateInput = {
    id?: string;
    inputText: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutExerciseMappingsInput;
    exercise: ExerciseCreateNestedOneWithoutUserMappingsInput;
  };

  export type UserExerciseMappingUncheckedCreateInput = {
    id?: string;
    userId: string;
    inputText: string;
    exerciseId: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserExerciseMappingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutExerciseMappingsNestedInput;
    exercise?: ExerciseUpdateOneRequiredWithoutUserMappingsNestedInput;
  };

  export type UserExerciseMappingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserExerciseMappingCreateManyInput = {
    id?: string;
    userId: string;
    inputText: string;
    exerciseId: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserExerciseMappingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserExerciseMappingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutExerciseCreateInput = {
    id?: string;
    sortOrder: number;
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput;
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput;
    sets?: ExerciseSetCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUncheckedCreateInput = {
    id?: string;
    workoutId: string;
    exerciseId: string;
    sortOrder: number;
    sets?: ExerciseSetUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    sets?: ExerciseSetUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    sets?: ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseCreateManyInput = {
    id?: string;
    workoutId: string;
    exerciseId: string;
    sortOrder: number;
  };

  export type WorkoutExerciseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
  };

  export type WorkoutExerciseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
  };

  export type ExerciseSetCreateInput = {
    id?: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
    workoutExercise: WorkoutExerciseCreateNestedOneWithoutSetsInput;
  };

  export type ExerciseSetUncheckedCreateInput = {
    id?: string;
    workoutExerciseId: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
  };

  export type ExerciseSetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
    workoutExercise?: WorkoutExerciseUpdateOneRequiredWithoutSetsNestedInput;
  };

  export type ExerciseSetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type ExerciseSetCreateManyInput = {
    id?: string;
    workoutExerciseId: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
  };

  export type ExerciseSetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type ExerciseSetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type WorkoutCommentCreateInput = {
    id?: string;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
    workout: WorkoutCreateNestedOneWithoutCommentsInput;
    workoutExercise?: WorkoutExerciseCreateNestedOneWithoutCommentsInput;
  };

  export type WorkoutCommentUncheckedCreateInput = {
    id?: string;
    workoutId: string;
    workoutExerciseId?: string | null;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type WorkoutCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workout?: WorkoutUpdateOneRequiredWithoutCommentsNestedInput;
    workoutExercise?: WorkoutExerciseUpdateOneWithoutCommentsNestedInput;
  };

  export type WorkoutCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: NullableStringFieldUpdateOperationsInput | string | null;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutCommentCreateManyInput = {
    id?: string;
    workoutId: string;
    workoutExerciseId?: string | null;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type WorkoutCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: NullableStringFieldUpdateOperationsInput | string | null;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type AuthProviderListRelationFilter = {
    every?: AuthProviderWhereInput;
    some?: AuthProviderWhereInput;
    none?: AuthProviderWhereInput;
  };

  export type WorkoutListRelationFilter = {
    every?: WorkoutWhereInput;
    some?: WorkoutWhereInput;
    none?: WorkoutWhereInput;
  };

  export type UserExerciseMappingListRelationFilter = {
    every?: UserExerciseMappingWhereInput;
    some?: UserExerciseMappingWhereInput;
    none?: UserExerciseMappingWhereInput;
  };

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput;
    some?: ExerciseWhereInput;
    none?: ExerciseWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AuthProviderOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type WorkoutOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserExerciseMappingOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    telegramId?: SortOrder;
    telegramUsername?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    displayName?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    telegramId?: SortOrder;
    telegramUsername?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    displayName?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    telegramId?: SortOrder;
    telegramUsername?: SortOrder;
    email?: SortOrder;
    passwordHash?: SortOrder;
    displayName?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type AuthProviderProviderProviderUserIdCompoundUniqueInput = {
    provider: string;
    providerUserId: string;
  };

  export type AuthProviderCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    provider?: SortOrder;
    providerUserId?: SortOrder;
    metadata?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuthProviderMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    provider?: SortOrder;
    providerUserId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type AuthProviderMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    provider?: SortOrder;
    providerUserId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type EnumWorkoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkoutStatus | EnumWorkoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWorkoutStatusFilter<$PrismaModel> | $Enums.WorkoutStatus;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type WorkoutExerciseListRelationFilter = {
    every?: WorkoutExerciseWhereInput;
    some?: WorkoutExerciseWhereInput;
    none?: WorkoutExerciseWhereInput;
  };

  export type WorkoutCommentListRelationFilter = {
    every?: WorkoutCommentWhereInput;
    some?: WorkoutCommentWhereInput;
    none?: WorkoutCommentWhereInput;
  };

  export type WorkoutExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type WorkoutCommentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type WorkoutCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    workoutDate?: SortOrder;
    status?: SortOrder;
    focus?: SortOrder;
    location?: SortOrder;
    comment?: SortOrder;
    rawTranscript?: SortOrder;
    sourceMessageId?: SortOrder;
    previewMessageId?: SortOrder;
    publishedMessageId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WorkoutAvgOrderByAggregateInput = {
    sourceMessageId?: SortOrder;
    previewMessageId?: SortOrder;
    publishedMessageId?: SortOrder;
  };

  export type WorkoutMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    workoutDate?: SortOrder;
    status?: SortOrder;
    location?: SortOrder;
    comment?: SortOrder;
    rawTranscript?: SortOrder;
    sourceMessageId?: SortOrder;
    previewMessageId?: SortOrder;
    publishedMessageId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WorkoutMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    workoutDate?: SortOrder;
    status?: SortOrder;
    location?: SortOrder;
    comment?: SortOrder;
    rawTranscript?: SortOrder;
    sourceMessageId?: SortOrder;
    previewMessageId?: SortOrder;
    publishedMessageId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WorkoutSumOrderByAggregateInput = {
    sourceMessageId?: SortOrder;
    previewMessageId?: SortOrder;
    publishedMessageId?: SortOrder;
  };

  export type EnumWorkoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkoutStatus | EnumWorkoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWorkoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkoutStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWorkoutStatusFilter<$PrismaModel>;
    _max?: NestedEnumWorkoutStatusFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type EnumExerciseCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseCategory | EnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel> | $Enums.ExerciseCategory | null;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type ExerciseSynonymListRelationFilter = {
    every?: ExerciseSynonymWhereInput;
    some?: ExerciseSynonymWhereInput;
    none?: ExerciseSynonymWhereInput;
  };

  export type ExerciseSynonymOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder;
    canonicalName?: SortOrder;
    displayNameRu?: SortOrder;
    displayNameEn?: SortOrder;
    movementPattern?: SortOrder;
    equipment?: SortOrder;
    primaryMuscles?: SortOrder;
    secondaryMuscles?: SortOrder;
    level?: SortOrder;
    instructions?: SortOrder;
    exerciseType?: SortOrder;
    category?: SortOrder;
    isGlobal?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder;
    canonicalName?: SortOrder;
    displayNameRu?: SortOrder;
    displayNameEn?: SortOrder;
    movementPattern?: SortOrder;
    equipment?: SortOrder;
    level?: SortOrder;
    exerciseType?: SortOrder;
    category?: SortOrder;
    isGlobal?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder;
    canonicalName?: SortOrder;
    displayNameRu?: SortOrder;
    displayNameEn?: SortOrder;
    movementPattern?: SortOrder;
    equipment?: SortOrder;
    level?: SortOrder;
    exerciseType?: SortOrder;
    category?: SortOrder;
    isGlobal?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
  };

  export type EnumExerciseCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseCategory | EnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    not?:
      | NestedEnumExerciseCategoryNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.ExerciseCategory
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel>;
    _max?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type ExerciseScalarRelationFilter = {
    is?: ExerciseWhereInput;
    isNot?: ExerciseWhereInput;
  };

  export type ExerciseSynonymCountOrderByAggregateInput = {
    id?: SortOrder;
    exerciseId?: SortOrder;
    synonym?: SortOrder;
    language?: SortOrder;
  };

  export type ExerciseSynonymMaxOrderByAggregateInput = {
    id?: SortOrder;
    exerciseId?: SortOrder;
    synonym?: SortOrder;
    language?: SortOrder;
  };

  export type ExerciseSynonymMinOrderByAggregateInput = {
    id?: SortOrder;
    exerciseId?: SortOrder;
    synonym?: SortOrder;
    language?: SortOrder;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type UserExerciseMappingCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    inputText?: SortOrder;
    exerciseId?: SortOrder;
    useCount?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserExerciseMappingAvgOrderByAggregateInput = {
    useCount?: SortOrder;
  };

  export type UserExerciseMappingMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    inputText?: SortOrder;
    exerciseId?: SortOrder;
    useCount?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserExerciseMappingMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    inputText?: SortOrder;
    exerciseId?: SortOrder;
    useCount?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserExerciseMappingSumOrderByAggregateInput = {
    useCount?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type WorkoutScalarRelationFilter = {
    is?: WorkoutWhereInput;
    isNot?: WorkoutWhereInput;
  };

  export type ExerciseSetListRelationFilter = {
    every?: ExerciseSetWhereInput;
    some?: ExerciseSetWhereInput;
    none?: ExerciseSetWhereInput;
  };

  export type ExerciseSetOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type WorkoutExerciseCountOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    exerciseId?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type WorkoutExerciseAvgOrderByAggregateInput = {
    sortOrder?: SortOrder;
  };

  export type WorkoutExerciseMaxOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    exerciseId?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type WorkoutExerciseMinOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    exerciseId?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type WorkoutExerciseSumOrderByAggregateInput = {
    sortOrder?: SortOrder;
  };

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type EnumWeightUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.WeightUnit | EnumWeightUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    not?: NestedEnumWeightUnitFilter<$PrismaModel> | $Enums.WeightUnit;
  };

  export type WorkoutExerciseScalarRelationFilter = {
    is?: WorkoutExerciseWhereInput;
    isNot?: WorkoutExerciseWhereInput;
  };

  export type ExerciseSetCountOrderByAggregateInput = {
    id?: SortOrder;
    workoutExerciseId?: SortOrder;
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrder;
    unit?: SortOrder;
  };

  export type ExerciseSetAvgOrderByAggregateInput = {
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrder;
  };

  export type ExerciseSetMaxOrderByAggregateInput = {
    id?: SortOrder;
    workoutExerciseId?: SortOrder;
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrder;
    unit?: SortOrder;
  };

  export type ExerciseSetMinOrderByAggregateInput = {
    id?: SortOrder;
    workoutExerciseId?: SortOrder;
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrder;
    unit?: SortOrder;
  };

  export type ExerciseSetSumOrderByAggregateInput = {
    setNumber?: SortOrder;
    reps?: SortOrder;
    weight?: SortOrder;
  };

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: NestedDecimalNullableFilter<$PrismaModel>;
    _min?: NestedDecimalNullableFilter<$PrismaModel>;
    _max?: NestedDecimalNullableFilter<$PrismaModel>;
  };

  export type EnumWeightUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WeightUnit | EnumWeightUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    not?: NestedEnumWeightUnitWithAggregatesFilter<$PrismaModel> | $Enums.WeightUnit;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWeightUnitFilter<$PrismaModel>;
    _max?: NestedEnumWeightUnitFilter<$PrismaModel>;
  };

  export type EnumCommentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentType | EnumCommentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCommentTypeFilter<$PrismaModel> | $Enums.CommentType;
  };

  export type EnumBodySideNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BodySide | EnumBodySideFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumBodySideNullableFilter<$PrismaModel> | $Enums.BodySide | null;
  };

  export type EnumSensationTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SensationType | EnumSensationTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumSensationTypeNullableFilter<$PrismaModel> | $Enums.SensationType | null;
  };

  export type WorkoutExerciseNullableScalarRelationFilter = {
    is?: WorkoutExerciseWhereInput | null;
    isNot?: WorkoutExerciseWhereInput | null;
  };

  export type WorkoutCommentCountOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    workoutExerciseId?: SortOrder;
    commentType?: SortOrder;
    bodyPart?: SortOrder;
    side?: SortOrder;
    sensationType?: SortOrder;
    rawText?: SortOrder;
    createdAt?: SortOrder;
  };

  export type WorkoutCommentMaxOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    workoutExerciseId?: SortOrder;
    commentType?: SortOrder;
    bodyPart?: SortOrder;
    side?: SortOrder;
    sensationType?: SortOrder;
    rawText?: SortOrder;
    createdAt?: SortOrder;
  };

  export type WorkoutCommentMinOrderByAggregateInput = {
    id?: SortOrder;
    workoutId?: SortOrder;
    workoutExerciseId?: SortOrder;
    commentType?: SortOrder;
    bodyPart?: SortOrder;
    side?: SortOrder;
    sensationType?: SortOrder;
    rawText?: SortOrder;
    createdAt?: SortOrder;
  };

  export type EnumCommentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentType | EnumCommentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCommentTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommentType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCommentTypeFilter<$PrismaModel>;
    _max?: NestedEnumCommentTypeFilter<$PrismaModel>;
  };

  export type EnumBodySideNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BodySide | EnumBodySideFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumBodySideNullableWithAggregatesFilter<$PrismaModel> | $Enums.BodySide | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumBodySideNullableFilter<$PrismaModel>;
    _max?: NestedEnumBodySideNullableFilter<$PrismaModel>;
  };

  export type EnumSensationTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SensationType | EnumSensationTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    not?:
      | NestedEnumSensationTypeNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.SensationType
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumSensationTypeNullableFilter<$PrismaModel>;
    _max?: NestedEnumSensationTypeNullableFilter<$PrismaModel>;
  };

  export type AuthProviderCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
      | AuthProviderCreateWithoutUserInput[]
      | AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthProviderCreateOrConnectWithoutUserInput
      | AuthProviderCreateOrConnectWithoutUserInput[];
    createMany?: AuthProviderCreateManyUserInputEnvelope;
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
  };

  export type WorkoutCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
      | WorkoutCreateWithoutUserInput[]
      | WorkoutUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WorkoutCreateOrConnectWithoutUserInput
      | WorkoutCreateOrConnectWithoutUserInput[];
    createMany?: WorkoutCreateManyUserInputEnvelope;
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
  };

  export type UserExerciseMappingCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutUserInput,
          UserExerciseMappingUncheckedCreateWithoutUserInput
        >
      | UserExerciseMappingCreateWithoutUserInput[]
      | UserExerciseMappingUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutUserInput
      | UserExerciseMappingCreateOrConnectWithoutUserInput[];
    createMany?: UserExerciseMappingCreateManyUserInputEnvelope;
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
  };

  export type ExerciseCreateNestedManyWithoutCreatorInput = {
    create?:
      | XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
      | ExerciseCreateWithoutCreatorInput[]
      | ExerciseUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | ExerciseCreateOrConnectWithoutCreatorInput
      | ExerciseCreateOrConnectWithoutCreatorInput[];
    createMany?: ExerciseCreateManyCreatorInputEnvelope;
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
  };

  export type AuthProviderUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
      | AuthProviderCreateWithoutUserInput[]
      | AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthProviderCreateOrConnectWithoutUserInput
      | AuthProviderCreateOrConnectWithoutUserInput[];
    createMany?: AuthProviderCreateManyUserInputEnvelope;
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
  };

  export type WorkoutUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
      | WorkoutCreateWithoutUserInput[]
      | WorkoutUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WorkoutCreateOrConnectWithoutUserInput
      | WorkoutCreateOrConnectWithoutUserInput[];
    createMany?: WorkoutCreateManyUserInputEnvelope;
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
  };

  export type UserExerciseMappingUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutUserInput,
          UserExerciseMappingUncheckedCreateWithoutUserInput
        >
      | UserExerciseMappingCreateWithoutUserInput[]
      | UserExerciseMappingUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutUserInput
      | UserExerciseMappingCreateOrConnectWithoutUserInput[];
    createMany?: UserExerciseMappingCreateManyUserInputEnvelope;
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
  };

  export type ExerciseUncheckedCreateNestedManyWithoutCreatorInput = {
    create?:
      | XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
      | ExerciseCreateWithoutCreatorInput[]
      | ExerciseUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | ExerciseCreateOrConnectWithoutCreatorInput
      | ExerciseCreateOrConnectWithoutCreatorInput[];
    createMany?: ExerciseCreateManyCreatorInputEnvelope;
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type AuthProviderUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
      | AuthProviderCreateWithoutUserInput[]
      | AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthProviderCreateOrConnectWithoutUserInput
      | AuthProviderCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuthProviderUpsertWithWhereUniqueWithoutUserInput
      | AuthProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuthProviderCreateManyUserInputEnvelope;
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    update?:
      | AuthProviderUpdateWithWhereUniqueWithoutUserInput
      | AuthProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuthProviderUpdateManyWithWhereWithoutUserInput
      | AuthProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[];
  };

  export type WorkoutUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
      | WorkoutCreateWithoutUserInput[]
      | WorkoutUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WorkoutCreateOrConnectWithoutUserInput
      | WorkoutCreateOrConnectWithoutUserInput[];
    upsert?:
      | WorkoutUpsertWithWhereUniqueWithoutUserInput
      | WorkoutUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: WorkoutCreateManyUserInputEnvelope;
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    update?:
      | WorkoutUpdateWithWhereUniqueWithoutUserInput
      | WorkoutUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | WorkoutUpdateManyWithWhereWithoutUserInput
      | WorkoutUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[];
  };

  export type UserExerciseMappingUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutUserInput,
          UserExerciseMappingUncheckedCreateWithoutUserInput
        >
      | UserExerciseMappingCreateWithoutUserInput[]
      | UserExerciseMappingUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutUserInput
      | UserExerciseMappingCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserExerciseMappingUpsertWithWhereUniqueWithoutUserInput
      | UserExerciseMappingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserExerciseMappingCreateManyUserInputEnvelope;
    set?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    disconnect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    delete?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    update?:
      | UserExerciseMappingUpdateWithWhereUniqueWithoutUserInput
      | UserExerciseMappingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserExerciseMappingUpdateManyWithWhereWithoutUserInput
      | UserExerciseMappingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
  };

  export type ExerciseUpdateManyWithoutCreatorNestedInput = {
    create?:
      | XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
      | ExerciseCreateWithoutCreatorInput[]
      | ExerciseUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | ExerciseCreateOrConnectWithoutCreatorInput
      | ExerciseCreateOrConnectWithoutCreatorInput[];
    upsert?:
      | ExerciseUpsertWithWhereUniqueWithoutCreatorInput
      | ExerciseUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: ExerciseCreateManyCreatorInputEnvelope;
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    update?:
      | ExerciseUpdateWithWhereUniqueWithoutCreatorInput
      | ExerciseUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?:
      | ExerciseUpdateManyWithWhereWithoutCreatorInput
      | ExerciseUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[];
  };

  export type AuthProviderUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
      | AuthProviderCreateWithoutUserInput[]
      | AuthProviderUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AuthProviderCreateOrConnectWithoutUserInput
      | AuthProviderCreateOrConnectWithoutUserInput[];
    upsert?:
      | AuthProviderUpsertWithWhereUniqueWithoutUserInput
      | AuthProviderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AuthProviderCreateManyUserInputEnvelope;
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[];
    update?:
      | AuthProviderUpdateWithWhereUniqueWithoutUserInput
      | AuthProviderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AuthProviderUpdateManyWithWhereWithoutUserInput
      | AuthProviderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[];
  };

  export type WorkoutUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>
      | WorkoutCreateWithoutUserInput[]
      | WorkoutUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WorkoutCreateOrConnectWithoutUserInput
      | WorkoutCreateOrConnectWithoutUserInput[];
    upsert?:
      | WorkoutUpsertWithWhereUniqueWithoutUserInput
      | WorkoutUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: WorkoutCreateManyUserInputEnvelope;
    set?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    disconnect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    delete?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    connect?: WorkoutWhereUniqueInput | WorkoutWhereUniqueInput[];
    update?:
      | WorkoutUpdateWithWhereUniqueWithoutUserInput
      | WorkoutUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | WorkoutUpdateManyWithWhereWithoutUserInput
      | WorkoutUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[];
  };

  export type UserExerciseMappingUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutUserInput,
          UserExerciseMappingUncheckedCreateWithoutUserInput
        >
      | UserExerciseMappingCreateWithoutUserInput[]
      | UserExerciseMappingUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutUserInput
      | UserExerciseMappingCreateOrConnectWithoutUserInput[];
    upsert?:
      | UserExerciseMappingUpsertWithWhereUniqueWithoutUserInput
      | UserExerciseMappingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: UserExerciseMappingCreateManyUserInputEnvelope;
    set?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    disconnect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    delete?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    update?:
      | UserExerciseMappingUpdateWithWhereUniqueWithoutUserInput
      | UserExerciseMappingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | UserExerciseMappingUpdateManyWithWhereWithoutUserInput
      | UserExerciseMappingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
  };

  export type ExerciseUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?:
      | XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>
      | ExerciseCreateWithoutCreatorInput[]
      | ExerciseUncheckedCreateWithoutCreatorInput[];
    connectOrCreate?:
      | ExerciseCreateOrConnectWithoutCreatorInput
      | ExerciseCreateOrConnectWithoutCreatorInput[];
    upsert?:
      | ExerciseUpsertWithWhereUniqueWithoutCreatorInput
      | ExerciseUpsertWithWhereUniqueWithoutCreatorInput[];
    createMany?: ExerciseCreateManyCreatorInputEnvelope;
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[];
    update?:
      | ExerciseUpdateWithWhereUniqueWithoutCreatorInput
      | ExerciseUpdateWithWhereUniqueWithoutCreatorInput[];
    updateMany?:
      | ExerciseUpdateManyWithWhereWithoutCreatorInput
      | ExerciseUpdateManyWithWhereWithoutCreatorInput[];
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutAuthProvidersInput = {
    create?: XOR<UserCreateWithoutAuthProvidersInput, UserUncheckedCreateWithoutAuthProvidersInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAuthProvidersInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutAuthProvidersNestedInput = {
    create?: XOR<UserCreateWithoutAuthProvidersInput, UserUncheckedCreateWithoutAuthProvidersInput>;
    connectOrCreate?: UserCreateOrConnectWithoutAuthProvidersInput;
    upsert?: UserUpsertWithoutAuthProvidersInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutAuthProvidersInput, UserUpdateWithoutAuthProvidersInput>,
      UserUncheckedUpdateWithoutAuthProvidersInput
    >;
  };

  export type WorkoutCreatefocusInput = {
    set: string[];
  };

  export type UserCreateNestedOneWithoutWorkoutsInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput;
    connect?: UserWhereUniqueInput;
  };

  export type WorkoutExerciseCreateNestedManyWithoutWorkoutInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutWorkoutInput,
          WorkoutExerciseUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutExerciseCreateWithoutWorkoutInput[]
      | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[];
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope;
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
  };

  export type WorkoutCommentCreateNestedManyWithoutWorkoutInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutCommentCreateWithoutWorkoutInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput[];
    createMany?: WorkoutCommentCreateManyWorkoutInputEnvelope;
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
  };

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutWorkoutInput,
          WorkoutExerciseUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutExerciseCreateWithoutWorkoutInput[]
      | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[];
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope;
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
  };

  export type WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutCommentCreateWithoutWorkoutInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput[];
    createMany?: WorkoutCommentCreateManyWorkoutInputEnvelope;
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
  };

  export type EnumWorkoutStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkoutStatus;
  };

  export type WorkoutUpdatefocusInput = {
    set?: string[];
    push?: string | string[];
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutWorkoutsNestedInput = {
    create?: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutWorkoutsInput;
    upsert?: UserUpsertWithoutWorkoutsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutWorkoutsInput, UserUpdateWithoutWorkoutsInput>,
      UserUncheckedUpdateWithoutWorkoutsInput
    >;
  };

  export type WorkoutExerciseUpdateManyWithoutWorkoutNestedInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutWorkoutInput,
          WorkoutExerciseUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutExerciseCreateWithoutWorkoutInput[]
      | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[];
    upsert?:
      | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput
      | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput[];
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope;
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    update?:
      | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput
      | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput[];
    updateMany?:
      | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput
      | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput[];
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
  };

  export type WorkoutCommentUpdateManyWithoutWorkoutNestedInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutCommentCreateWithoutWorkoutInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput[];
    upsert?:
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutInput
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutInput[];
    createMany?: WorkoutCommentCreateManyWorkoutInputEnvelope;
    set?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    disconnect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    delete?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    update?:
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutInput
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutInput[];
    updateMany?:
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutInput
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutInput[];
    deleteMany?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
  };

  export type WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutWorkoutInput,
          WorkoutExerciseUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutExerciseCreateWithoutWorkoutInput[]
      | WorkoutExerciseUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput
      | WorkoutExerciseCreateOrConnectWithoutWorkoutInput[];
    upsert?:
      | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput
      | WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput[];
    createMany?: WorkoutExerciseCreateManyWorkoutInputEnvelope;
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    update?:
      | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput
      | WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput[];
    updateMany?:
      | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput
      | WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput[];
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
  };

  export type WorkoutCommentUncheckedUpdateManyWithoutWorkoutNestedInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutInput
        >
      | WorkoutCommentCreateWithoutWorkoutInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutInput[];
    upsert?:
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutInput
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutInput[];
    createMany?: WorkoutCommentCreateManyWorkoutInputEnvelope;
    set?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    disconnect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    delete?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    update?:
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutInput
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutInput[];
    updateMany?:
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutInput
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutInput[];
    deleteMany?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
  };

  export type ExerciseCreateprimaryMusclesInput = {
    set: string[];
  };

  export type ExerciseCreatesecondaryMusclesInput = {
    set: string[];
  };

  export type ExerciseCreateinstructionsInput = {
    set: string[];
  };

  export type UserCreateNestedOneWithoutCreatedExercisesInput = {
    create?: XOR<
      UserCreateWithoutCreatedExercisesInput,
      UserUncheckedCreateWithoutCreatedExercisesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCreatedExercisesInput;
    connect?: UserWhereUniqueInput;
  };

  export type ExerciseSynonymCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          ExerciseSynonymCreateWithoutExerciseInput,
          ExerciseSynonymUncheckedCreateWithoutExerciseInput
        >
      | ExerciseSynonymCreateWithoutExerciseInput[]
      | ExerciseSynonymUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput[];
    createMany?: ExerciseSynonymCreateManyExerciseInputEnvelope;
    connect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
  };

  export type WorkoutExerciseCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutExerciseInput,
          WorkoutExerciseUncheckedCreateWithoutExerciseInput
        >
      | WorkoutExerciseCreateWithoutExerciseInput[]
      | WorkoutExerciseUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput[];
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope;
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
  };

  export type UserExerciseMappingCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutExerciseInput,
          UserExerciseMappingUncheckedCreateWithoutExerciseInput
        >
      | UserExerciseMappingCreateWithoutExerciseInput[]
      | UserExerciseMappingUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput[];
    createMany?: UserExerciseMappingCreateManyExerciseInputEnvelope;
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
  };

  export type ExerciseSynonymUncheckedCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          ExerciseSynonymCreateWithoutExerciseInput,
          ExerciseSynonymUncheckedCreateWithoutExerciseInput
        >
      | ExerciseSynonymCreateWithoutExerciseInput[]
      | ExerciseSynonymUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput[];
    createMany?: ExerciseSynonymCreateManyExerciseInputEnvelope;
    connect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
  };

  export type WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutExerciseInput,
          WorkoutExerciseUncheckedCreateWithoutExerciseInput
        >
      | WorkoutExerciseCreateWithoutExerciseInput[]
      | WorkoutExerciseUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput[];
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope;
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
  };

  export type UserExerciseMappingUncheckedCreateNestedManyWithoutExerciseInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutExerciseInput,
          UserExerciseMappingUncheckedCreateWithoutExerciseInput
        >
      | UserExerciseMappingCreateWithoutExerciseInput[]
      | UserExerciseMappingUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput[];
    createMany?: UserExerciseMappingCreateManyExerciseInputEnvelope;
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
  };

  export type ExerciseUpdateprimaryMusclesInput = {
    set?: string[];
    push?: string | string[];
  };

  export type ExerciseUpdatesecondaryMusclesInput = {
    set?: string[];
    push?: string | string[];
  };

  export type ExerciseUpdateinstructionsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type NullableEnumExerciseCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ExerciseCategory | null;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type UserUpdateOneWithoutCreatedExercisesNestedInput = {
    create?: XOR<
      UserCreateWithoutCreatedExercisesInput,
      UserUncheckedCreateWithoutCreatedExercisesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutCreatedExercisesInput;
    upsert?: UserUpsertWithoutCreatedExercisesInput;
    disconnect?: UserWhereInput | boolean;
    delete?: UserWhereInput | boolean;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutCreatedExercisesInput,
        UserUpdateWithoutCreatedExercisesInput
      >,
      UserUncheckedUpdateWithoutCreatedExercisesInput
    >;
  };

  export type ExerciseSynonymUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          ExerciseSynonymCreateWithoutExerciseInput,
          ExerciseSynonymUncheckedCreateWithoutExerciseInput
        >
      | ExerciseSynonymCreateWithoutExerciseInput[]
      | ExerciseSynonymUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | ExerciseSynonymUpsertWithWhereUniqueWithoutExerciseInput
      | ExerciseSynonymUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: ExerciseSynonymCreateManyExerciseInputEnvelope;
    set?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    disconnect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    delete?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    connect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    update?:
      | ExerciseSynonymUpdateWithWhereUniqueWithoutExerciseInput
      | ExerciseSynonymUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | ExerciseSynonymUpdateManyWithWhereWithoutExerciseInput
      | ExerciseSynonymUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: ExerciseSynonymScalarWhereInput | ExerciseSynonymScalarWhereInput[];
  };

  export type WorkoutExerciseUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutExerciseInput,
          WorkoutExerciseUncheckedCreateWithoutExerciseInput
        >
      | WorkoutExerciseCreateWithoutExerciseInput[]
      | WorkoutExerciseUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput
      | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope;
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    update?:
      | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput
      | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput
      | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
  };

  export type UserExerciseMappingUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutExerciseInput,
          UserExerciseMappingUncheckedCreateWithoutExerciseInput
        >
      | UserExerciseMappingCreateWithoutExerciseInput[]
      | UserExerciseMappingUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | UserExerciseMappingUpsertWithWhereUniqueWithoutExerciseInput
      | UserExerciseMappingUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: UserExerciseMappingCreateManyExerciseInputEnvelope;
    set?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    disconnect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    delete?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    update?:
      | UserExerciseMappingUpdateWithWhereUniqueWithoutExerciseInput
      | UserExerciseMappingUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | UserExerciseMappingUpdateManyWithWhereWithoutExerciseInput
      | UserExerciseMappingUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
  };

  export type ExerciseSynonymUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          ExerciseSynonymCreateWithoutExerciseInput,
          ExerciseSynonymUncheckedCreateWithoutExerciseInput
        >
      | ExerciseSynonymCreateWithoutExerciseInput[]
      | ExerciseSynonymUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput
      | ExerciseSynonymCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | ExerciseSynonymUpsertWithWhereUniqueWithoutExerciseInput
      | ExerciseSynonymUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: ExerciseSynonymCreateManyExerciseInputEnvelope;
    set?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    disconnect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    delete?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    connect?: ExerciseSynonymWhereUniqueInput | ExerciseSynonymWhereUniqueInput[];
    update?:
      | ExerciseSynonymUpdateWithWhereUniqueWithoutExerciseInput
      | ExerciseSynonymUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | ExerciseSynonymUpdateManyWithWhereWithoutExerciseInput
      | ExerciseSynonymUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: ExerciseSynonymScalarWhereInput | ExerciseSynonymScalarWhereInput[];
  };

  export type WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          WorkoutExerciseCreateWithoutExerciseInput,
          WorkoutExerciseUncheckedCreateWithoutExerciseInput
        >
      | WorkoutExerciseCreateWithoutExerciseInput[]
      | WorkoutExerciseUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput
      | WorkoutExerciseCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput
      | WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: WorkoutExerciseCreateManyExerciseInputEnvelope;
    set?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    disconnect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    delete?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    connect?: WorkoutExerciseWhereUniqueInput | WorkoutExerciseWhereUniqueInput[];
    update?:
      | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput
      | WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput
      | WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
  };

  export type UserExerciseMappingUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?:
      | XOR<
          UserExerciseMappingCreateWithoutExerciseInput,
          UserExerciseMappingUncheckedCreateWithoutExerciseInput
        >
      | UserExerciseMappingCreateWithoutExerciseInput[]
      | UserExerciseMappingUncheckedCreateWithoutExerciseInput[];
    connectOrCreate?:
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput
      | UserExerciseMappingCreateOrConnectWithoutExerciseInput[];
    upsert?:
      | UserExerciseMappingUpsertWithWhereUniqueWithoutExerciseInput
      | UserExerciseMappingUpsertWithWhereUniqueWithoutExerciseInput[];
    createMany?: UserExerciseMappingCreateManyExerciseInputEnvelope;
    set?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    disconnect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    delete?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    connect?: UserExerciseMappingWhereUniqueInput | UserExerciseMappingWhereUniqueInput[];
    update?:
      | UserExerciseMappingUpdateWithWhereUniqueWithoutExerciseInput
      | UserExerciseMappingUpdateWithWhereUniqueWithoutExerciseInput[];
    updateMany?:
      | UserExerciseMappingUpdateManyWithWhereWithoutExerciseInput
      | UserExerciseMappingUpdateManyWithWhereWithoutExerciseInput[];
    deleteMany?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
  };

  export type ExerciseCreateNestedOneWithoutSynonymsInput = {
    create?: XOR<ExerciseCreateWithoutSynonymsInput, ExerciseUncheckedCreateWithoutSynonymsInput>;
    connectOrCreate?: ExerciseCreateOrConnectWithoutSynonymsInput;
    connect?: ExerciseWhereUniqueInput;
  };

  export type ExerciseUpdateOneRequiredWithoutSynonymsNestedInput = {
    create?: XOR<ExerciseCreateWithoutSynonymsInput, ExerciseUncheckedCreateWithoutSynonymsInput>;
    connectOrCreate?: ExerciseCreateOrConnectWithoutSynonymsInput;
    upsert?: ExerciseUpsertWithoutSynonymsInput;
    connect?: ExerciseWhereUniqueInput;
    update?: XOR<
      XOR<ExerciseUpdateToOneWithWhereWithoutSynonymsInput, ExerciseUpdateWithoutSynonymsInput>,
      ExerciseUncheckedUpdateWithoutSynonymsInput
    >;
  };

  export type UserCreateNestedOneWithoutExerciseMappingsInput = {
    create?: XOR<
      UserCreateWithoutExerciseMappingsInput,
      UserUncheckedCreateWithoutExerciseMappingsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExerciseMappingsInput;
    connect?: UserWhereUniqueInput;
  };

  export type ExerciseCreateNestedOneWithoutUserMappingsInput = {
    create?: XOR<
      ExerciseCreateWithoutUserMappingsInput,
      ExerciseUncheckedCreateWithoutUserMappingsInput
    >;
    connectOrCreate?: ExerciseCreateOrConnectWithoutUserMappingsInput;
    connect?: ExerciseWhereUniqueInput;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutExerciseMappingsNestedInput = {
    create?: XOR<
      UserCreateWithoutExerciseMappingsInput,
      UserUncheckedCreateWithoutExerciseMappingsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExerciseMappingsInput;
    upsert?: UserUpsertWithoutExerciseMappingsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutExerciseMappingsInput,
        UserUpdateWithoutExerciseMappingsInput
      >,
      UserUncheckedUpdateWithoutExerciseMappingsInput
    >;
  };

  export type ExerciseUpdateOneRequiredWithoutUserMappingsNestedInput = {
    create?: XOR<
      ExerciseCreateWithoutUserMappingsInput,
      ExerciseUncheckedCreateWithoutUserMappingsInput
    >;
    connectOrCreate?: ExerciseCreateOrConnectWithoutUserMappingsInput;
    upsert?: ExerciseUpsertWithoutUserMappingsInput;
    connect?: ExerciseWhereUniqueInput;
    update?: XOR<
      XOR<
        ExerciseUpdateToOneWithWhereWithoutUserMappingsInput,
        ExerciseUpdateWithoutUserMappingsInput
      >,
      ExerciseUncheckedUpdateWithoutUserMappingsInput
    >;
  };

  export type WorkoutCreateNestedOneWithoutWorkoutExercisesInput = {
    create?: XOR<
      WorkoutCreateWithoutWorkoutExercisesInput,
      WorkoutUncheckedCreateWithoutWorkoutExercisesInput
    >;
    connectOrCreate?: WorkoutCreateOrConnectWithoutWorkoutExercisesInput;
    connect?: WorkoutWhereUniqueInput;
  };

  export type ExerciseCreateNestedOneWithoutWorkoutExercisesInput = {
    create?: XOR<
      ExerciseCreateWithoutWorkoutExercisesInput,
      ExerciseUncheckedCreateWithoutWorkoutExercisesInput
    >;
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutExercisesInput;
    connect?: ExerciseWhereUniqueInput;
  };

  export type ExerciseSetCreateNestedManyWithoutWorkoutExerciseInput = {
    create?:
      | XOR<
          ExerciseSetCreateWithoutWorkoutExerciseInput,
          ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
        >
      | ExerciseSetCreateWithoutWorkoutExerciseInput[]
      | ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput[];
    createMany?: ExerciseSetCreateManyWorkoutExerciseInputEnvelope;
    connect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
  };

  export type WorkoutCommentCreateNestedManyWithoutWorkoutExerciseInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutExerciseInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
        >
      | WorkoutCommentCreateWithoutWorkoutExerciseInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput[];
    createMany?: WorkoutCommentCreateManyWorkoutExerciseInputEnvelope;
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
  };

  export type ExerciseSetUncheckedCreateNestedManyWithoutWorkoutExerciseInput = {
    create?:
      | XOR<
          ExerciseSetCreateWithoutWorkoutExerciseInput,
          ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
        >
      | ExerciseSetCreateWithoutWorkoutExerciseInput[]
      | ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput[];
    createMany?: ExerciseSetCreateManyWorkoutExerciseInputEnvelope;
    connect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
  };

  export type WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutExerciseInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutExerciseInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
        >
      | WorkoutCommentCreateWithoutWorkoutExerciseInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput[];
    createMany?: WorkoutCommentCreateManyWorkoutExerciseInputEnvelope;
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
  };

  export type WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput = {
    create?: XOR<
      WorkoutCreateWithoutWorkoutExercisesInput,
      WorkoutUncheckedCreateWithoutWorkoutExercisesInput
    >;
    connectOrCreate?: WorkoutCreateOrConnectWithoutWorkoutExercisesInput;
    upsert?: WorkoutUpsertWithoutWorkoutExercisesInput;
    connect?: WorkoutWhereUniqueInput;
    update?: XOR<
      XOR<
        WorkoutUpdateToOneWithWhereWithoutWorkoutExercisesInput,
        WorkoutUpdateWithoutWorkoutExercisesInput
      >,
      WorkoutUncheckedUpdateWithoutWorkoutExercisesInput
    >;
  };

  export type ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput = {
    create?: XOR<
      ExerciseCreateWithoutWorkoutExercisesInput,
      ExerciseUncheckedCreateWithoutWorkoutExercisesInput
    >;
    connectOrCreate?: ExerciseCreateOrConnectWithoutWorkoutExercisesInput;
    upsert?: ExerciseUpsertWithoutWorkoutExercisesInput;
    connect?: ExerciseWhereUniqueInput;
    update?: XOR<
      XOR<
        ExerciseUpdateToOneWithWhereWithoutWorkoutExercisesInput,
        ExerciseUpdateWithoutWorkoutExercisesInput
      >,
      ExerciseUncheckedUpdateWithoutWorkoutExercisesInput
    >;
  };

  export type ExerciseSetUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?:
      | XOR<
          ExerciseSetCreateWithoutWorkoutExerciseInput,
          ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
        >
      | ExerciseSetCreateWithoutWorkoutExerciseInput[]
      | ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput[];
    upsert?:
      | ExerciseSetUpsertWithWhereUniqueWithoutWorkoutExerciseInput
      | ExerciseSetUpsertWithWhereUniqueWithoutWorkoutExerciseInput[];
    createMany?: ExerciseSetCreateManyWorkoutExerciseInputEnvelope;
    set?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    disconnect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    delete?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    connect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    update?:
      | ExerciseSetUpdateWithWhereUniqueWithoutWorkoutExerciseInput
      | ExerciseSetUpdateWithWhereUniqueWithoutWorkoutExerciseInput[];
    updateMany?:
      | ExerciseSetUpdateManyWithWhereWithoutWorkoutExerciseInput
      | ExerciseSetUpdateManyWithWhereWithoutWorkoutExerciseInput[];
    deleteMany?: ExerciseSetScalarWhereInput | ExerciseSetScalarWhereInput[];
  };

  export type WorkoutCommentUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutExerciseInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
        >
      | WorkoutCommentCreateWithoutWorkoutExerciseInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput[];
    upsert?:
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutExerciseInput
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutExerciseInput[];
    createMany?: WorkoutCommentCreateManyWorkoutExerciseInputEnvelope;
    set?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    disconnect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    delete?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    update?:
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutExerciseInput
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutExerciseInput[];
    updateMany?:
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutExerciseInput
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutExerciseInput[];
    deleteMany?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
  };

  export type ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?:
      | XOR<
          ExerciseSetCreateWithoutWorkoutExerciseInput,
          ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
        >
      | ExerciseSetCreateWithoutWorkoutExerciseInput[]
      | ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput
      | ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput[];
    upsert?:
      | ExerciseSetUpsertWithWhereUniqueWithoutWorkoutExerciseInput
      | ExerciseSetUpsertWithWhereUniqueWithoutWorkoutExerciseInput[];
    createMany?: ExerciseSetCreateManyWorkoutExerciseInputEnvelope;
    set?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    disconnect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    delete?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    connect?: ExerciseSetWhereUniqueInput | ExerciseSetWhereUniqueInput[];
    update?:
      | ExerciseSetUpdateWithWhereUniqueWithoutWorkoutExerciseInput
      | ExerciseSetUpdateWithWhereUniqueWithoutWorkoutExerciseInput[];
    updateMany?:
      | ExerciseSetUpdateManyWithWhereWithoutWorkoutExerciseInput
      | ExerciseSetUpdateManyWithWhereWithoutWorkoutExerciseInput[];
    deleteMany?: ExerciseSetScalarWhereInput | ExerciseSetScalarWhereInput[];
  };

  export type WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseNestedInput = {
    create?:
      | XOR<
          WorkoutCommentCreateWithoutWorkoutExerciseInput,
          WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
        >
      | WorkoutCommentCreateWithoutWorkoutExerciseInput[]
      | WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput[];
    connectOrCreate?:
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput
      | WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput[];
    upsert?:
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutExerciseInput
      | WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutExerciseInput[];
    createMany?: WorkoutCommentCreateManyWorkoutExerciseInputEnvelope;
    set?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    disconnect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    delete?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    connect?: WorkoutCommentWhereUniqueInput | WorkoutCommentWhereUniqueInput[];
    update?:
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutExerciseInput
      | WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutExerciseInput[];
    updateMany?:
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutExerciseInput
      | WorkoutCommentUpdateManyWithWhereWithoutWorkoutExerciseInput[];
    deleteMany?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
  };

  export type WorkoutExerciseCreateNestedOneWithoutSetsInput = {
    create?: XOR<
      WorkoutExerciseCreateWithoutSetsInput,
      WorkoutExerciseUncheckedCreateWithoutSetsInput
    >;
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutSetsInput;
    connect?: WorkoutExerciseWhereUniqueInput;
  };

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type EnumWeightUnitFieldUpdateOperationsInput = {
    set?: $Enums.WeightUnit;
  };

  export type WorkoutExerciseUpdateOneRequiredWithoutSetsNestedInput = {
    create?: XOR<
      WorkoutExerciseCreateWithoutSetsInput,
      WorkoutExerciseUncheckedCreateWithoutSetsInput
    >;
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutSetsInput;
    upsert?: WorkoutExerciseUpsertWithoutSetsInput;
    connect?: WorkoutExerciseWhereUniqueInput;
    update?: XOR<
      XOR<
        WorkoutExerciseUpdateToOneWithWhereWithoutSetsInput,
        WorkoutExerciseUpdateWithoutSetsInput
      >,
      WorkoutExerciseUncheckedUpdateWithoutSetsInput
    >;
  };

  export type WorkoutCreateNestedOneWithoutCommentsInput = {
    create?: XOR<WorkoutCreateWithoutCommentsInput, WorkoutUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: WorkoutCreateOrConnectWithoutCommentsInput;
    connect?: WorkoutWhereUniqueInput;
  };

  export type WorkoutExerciseCreateNestedOneWithoutCommentsInput = {
    create?: XOR<
      WorkoutExerciseCreateWithoutCommentsInput,
      WorkoutExerciseUncheckedCreateWithoutCommentsInput
    >;
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCommentsInput;
    connect?: WorkoutExerciseWhereUniqueInput;
  };

  export type EnumCommentTypeFieldUpdateOperationsInput = {
    set?: $Enums.CommentType;
  };

  export type NullableEnumBodySideFieldUpdateOperationsInput = {
    set?: $Enums.BodySide | null;
  };

  export type NullableEnumSensationTypeFieldUpdateOperationsInput = {
    set?: $Enums.SensationType | null;
  };

  export type WorkoutUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<WorkoutCreateWithoutCommentsInput, WorkoutUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: WorkoutCreateOrConnectWithoutCommentsInput;
    upsert?: WorkoutUpsertWithoutCommentsInput;
    connect?: WorkoutWhereUniqueInput;
    update?: XOR<
      XOR<WorkoutUpdateToOneWithWhereWithoutCommentsInput, WorkoutUpdateWithoutCommentsInput>,
      WorkoutUncheckedUpdateWithoutCommentsInput
    >;
  };

  export type WorkoutExerciseUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<
      WorkoutExerciseCreateWithoutCommentsInput,
      WorkoutExerciseUncheckedCreateWithoutCommentsInput
    >;
    connectOrCreate?: WorkoutExerciseCreateOrConnectWithoutCommentsInput;
    upsert?: WorkoutExerciseUpsertWithoutCommentsInput;
    disconnect?: WorkoutExerciseWhereInput | boolean;
    delete?: WorkoutExerciseWhereInput | boolean;
    connect?: WorkoutExerciseWhereUniqueInput;
    update?: XOR<
      XOR<
        WorkoutExerciseUpdateToOneWithWhereWithoutCommentsInput,
        WorkoutExerciseUpdateWithoutCommentsInput
      >,
      WorkoutExerciseUncheckedUpdateWithoutCommentsInput
    >;
  };

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedEnumWorkoutStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkoutStatus | EnumWorkoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWorkoutStatusFilter<$PrismaModel> | $Enums.WorkoutStatus;
  };

  export type NestedEnumWorkoutStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkoutStatus | EnumWorkoutStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkoutStatus[] | ListEnumWorkoutStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumWorkoutStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkoutStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWorkoutStatusFilter<$PrismaModel>;
    _max?: NestedEnumWorkoutStatusFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumExerciseCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseCategory | EnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel> | $Enums.ExerciseCategory | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedEnumExerciseCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExerciseCategory | EnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    in?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.ExerciseCategory[] | ListEnumExerciseCategoryFieldRefInput<$PrismaModel> | null;
    not?:
      | NestedEnumExerciseCategoryNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.ExerciseCategory
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel>;
    _max?: NestedEnumExerciseCategoryNullableFilter<$PrismaModel>;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type NestedEnumWeightUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.WeightUnit | EnumWeightUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    not?: NestedEnumWeightUnitFilter<$PrismaModel> | $Enums.WeightUnit;
  };

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: NestedDecimalNullableFilter<$PrismaModel>;
    _min?: NestedDecimalNullableFilter<$PrismaModel>;
    _max?: NestedDecimalNullableFilter<$PrismaModel>;
  };

  export type NestedEnumWeightUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WeightUnit | EnumWeightUnitFieldRefInput<$PrismaModel>;
    in?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WeightUnit[] | ListEnumWeightUnitFieldRefInput<$PrismaModel>;
    not?: NestedEnumWeightUnitWithAggregatesFilter<$PrismaModel> | $Enums.WeightUnit;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumWeightUnitFilter<$PrismaModel>;
    _max?: NestedEnumWeightUnitFilter<$PrismaModel>;
  };

  export type NestedEnumCommentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentType | EnumCommentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCommentTypeFilter<$PrismaModel> | $Enums.CommentType;
  };

  export type NestedEnumBodySideNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.BodySide | EnumBodySideFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumBodySideNullableFilter<$PrismaModel> | $Enums.BodySide | null;
  };

  export type NestedEnumSensationTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SensationType | EnumSensationTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumSensationTypeNullableFilter<$PrismaModel> | $Enums.SensationType | null;
  };

  export type NestedEnumCommentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommentType | EnumCommentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CommentType[] | ListEnumCommentTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCommentTypeWithAggregatesFilter<$PrismaModel> | $Enums.CommentType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCommentTypeFilter<$PrismaModel>;
    _max?: NestedEnumCommentTypeFilter<$PrismaModel>;
  };

  export type NestedEnumBodySideNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BodySide | EnumBodySideFieldRefInput<$PrismaModel> | null;
    in?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.BodySide[] | ListEnumBodySideFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumBodySideNullableWithAggregatesFilter<$PrismaModel> | $Enums.BodySide | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumBodySideNullableFilter<$PrismaModel>;
    _max?: NestedEnumBodySideNullableFilter<$PrismaModel>;
  };

  export type NestedEnumSensationTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SensationType | EnumSensationTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.SensationType[] | ListEnumSensationTypeFieldRefInput<$PrismaModel> | null;
    not?:
      | NestedEnumSensationTypeNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.SensationType
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumSensationTypeNullableFilter<$PrismaModel>;
    _max?: NestedEnumSensationTypeNullableFilter<$PrismaModel>;
  };

  export type AuthProviderCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type AuthProviderUncheckedCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type AuthProviderCreateOrConnectWithoutUserInput = {
    where: AuthProviderWhereUniqueInput;
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>;
  };

  export type AuthProviderCreateManyUserInputEnvelope = {
    data: AuthProviderCreateManyUserInput | AuthProviderCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type WorkoutCreateWithoutUserInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutUncheckedCreateWithoutUserInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutCreateOrConnectWithoutUserInput = {
    where: WorkoutWhereUniqueInput;
    create: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>;
  };

  export type WorkoutCreateManyUserInputEnvelope = {
    data: WorkoutCreateManyUserInput | WorkoutCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type UserExerciseMappingCreateWithoutUserInput = {
    id?: string;
    inputText: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    exercise: ExerciseCreateNestedOneWithoutUserMappingsInput;
  };

  export type UserExerciseMappingUncheckedCreateWithoutUserInput = {
    id?: string;
    inputText: string;
    exerciseId: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserExerciseMappingCreateOrConnectWithoutUserInput = {
    where: UserExerciseMappingWhereUniqueInput;
    create: XOR<
      UserExerciseMappingCreateWithoutUserInput,
      UserExerciseMappingUncheckedCreateWithoutUserInput
    >;
  };

  export type UserExerciseMappingCreateManyUserInputEnvelope = {
    data: UserExerciseMappingCreateManyUserInput | UserExerciseMappingCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ExerciseCreateWithoutCreatorInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    synonyms?: ExerciseSynonymCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUncheckedCreateWithoutCreatorInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    synonyms?: ExerciseSynonymUncheckedCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseCreateOrConnectWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput;
    create: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>;
  };

  export type ExerciseCreateManyCreatorInputEnvelope = {
    data: ExerciseCreateManyCreatorInput | ExerciseCreateManyCreatorInput[];
    skipDuplicates?: boolean;
  };

  export type AuthProviderUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthProviderWhereUniqueInput;
    update: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>;
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>;
  };

  export type AuthProviderUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthProviderWhereUniqueInput;
    data: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>;
  };

  export type AuthProviderUpdateManyWithWhereWithoutUserInput = {
    where: AuthProviderScalarWhereInput;
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyWithoutUserInput>;
  };

  export type AuthProviderScalarWhereInput = {
    AND?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[];
    OR?: AuthProviderScalarWhereInput[];
    NOT?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[];
    id?: UuidFilter<'AuthProvider'> | string;
    userId?: UuidFilter<'AuthProvider'> | string;
    provider?: StringFilter<'AuthProvider'> | string;
    providerUserId?: StringFilter<'AuthProvider'> | string;
    metadata?: JsonNullableFilter<'AuthProvider'>;
    createdAt?: DateTimeFilter<'AuthProvider'> | Date | string;
  };

  export type WorkoutUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkoutWhereUniqueInput;
    update: XOR<WorkoutUpdateWithoutUserInput, WorkoutUncheckedUpdateWithoutUserInput>;
    create: XOR<WorkoutCreateWithoutUserInput, WorkoutUncheckedCreateWithoutUserInput>;
  };

  export type WorkoutUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkoutWhereUniqueInput;
    data: XOR<WorkoutUpdateWithoutUserInput, WorkoutUncheckedUpdateWithoutUserInput>;
  };

  export type WorkoutUpdateManyWithWhereWithoutUserInput = {
    where: WorkoutScalarWhereInput;
    data: XOR<WorkoutUpdateManyMutationInput, WorkoutUncheckedUpdateManyWithoutUserInput>;
  };

  export type WorkoutScalarWhereInput = {
    AND?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[];
    OR?: WorkoutScalarWhereInput[];
    NOT?: WorkoutScalarWhereInput | WorkoutScalarWhereInput[];
    id?: UuidFilter<'Workout'> | string;
    userId?: UuidFilter<'Workout'> | string;
    workoutDate?: DateTimeFilter<'Workout'> | Date | string;
    status?: EnumWorkoutStatusFilter<'Workout'> | $Enums.WorkoutStatus;
    focus?: StringNullableListFilter<'Workout'>;
    location?: StringNullableFilter<'Workout'> | string | null;
    comment?: StringNullableFilter<'Workout'> | string | null;
    rawTranscript?: StringNullableFilter<'Workout'> | string | null;
    sourceMessageId?: IntNullableFilter<'Workout'> | number | null;
    previewMessageId?: IntNullableFilter<'Workout'> | number | null;
    publishedMessageId?: IntNullableFilter<'Workout'> | number | null;
    createdAt?: DateTimeFilter<'Workout'> | Date | string;
    updatedAt?: DateTimeFilter<'Workout'> | Date | string;
  };

  export type UserExerciseMappingUpsertWithWhereUniqueWithoutUserInput = {
    where: UserExerciseMappingWhereUniqueInput;
    update: XOR<
      UserExerciseMappingUpdateWithoutUserInput,
      UserExerciseMappingUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      UserExerciseMappingCreateWithoutUserInput,
      UserExerciseMappingUncheckedCreateWithoutUserInput
    >;
  };

  export type UserExerciseMappingUpdateWithWhereUniqueWithoutUserInput = {
    where: UserExerciseMappingWhereUniqueInput;
    data: XOR<
      UserExerciseMappingUpdateWithoutUserInput,
      UserExerciseMappingUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserExerciseMappingUpdateManyWithWhereWithoutUserInput = {
    where: UserExerciseMappingScalarWhereInput;
    data: XOR<
      UserExerciseMappingUpdateManyMutationInput,
      UserExerciseMappingUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type UserExerciseMappingScalarWhereInput = {
    AND?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
    OR?: UserExerciseMappingScalarWhereInput[];
    NOT?: UserExerciseMappingScalarWhereInput | UserExerciseMappingScalarWhereInput[];
    id?: UuidFilter<'UserExerciseMapping'> | string;
    userId?: UuidFilter<'UserExerciseMapping'> | string;
    inputText?: StringFilter<'UserExerciseMapping'> | string;
    exerciseId?: UuidFilter<'UserExerciseMapping'> | string;
    useCount?: IntFilter<'UserExerciseMapping'> | number;
    createdAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
    updatedAt?: DateTimeFilter<'UserExerciseMapping'> | Date | string;
  };

  export type ExerciseUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput;
    update: XOR<ExerciseUpdateWithoutCreatorInput, ExerciseUncheckedUpdateWithoutCreatorInput>;
    create: XOR<ExerciseCreateWithoutCreatorInput, ExerciseUncheckedCreateWithoutCreatorInput>;
  };

  export type ExerciseUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ExerciseWhereUniqueInput;
    data: XOR<ExerciseUpdateWithoutCreatorInput, ExerciseUncheckedUpdateWithoutCreatorInput>;
  };

  export type ExerciseUpdateManyWithWhereWithoutCreatorInput = {
    where: ExerciseScalarWhereInput;
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutCreatorInput>;
  };

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[];
    OR?: ExerciseScalarWhereInput[];
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[];
    id?: UuidFilter<'Exercise'> | string;
    canonicalName?: StringFilter<'Exercise'> | string;
    displayNameRu?: StringNullableFilter<'Exercise'> | string | null;
    displayNameEn?: StringNullableFilter<'Exercise'> | string | null;
    movementPattern?: StringNullableFilter<'Exercise'> | string | null;
    equipment?: StringNullableFilter<'Exercise'> | string | null;
    primaryMuscles?: StringNullableListFilter<'Exercise'>;
    secondaryMuscles?: StringNullableListFilter<'Exercise'>;
    level?: StringNullableFilter<'Exercise'> | string | null;
    instructions?: StringNullableListFilter<'Exercise'>;
    exerciseType?: StringNullableFilter<'Exercise'> | string | null;
    category?: EnumExerciseCategoryNullableFilter<'Exercise'> | $Enums.ExerciseCategory | null;
    isGlobal?: BoolFilter<'Exercise'> | boolean;
    createdBy?: UuidNullableFilter<'Exercise'> | string | null;
    createdAt?: DateTimeFilter<'Exercise'> | Date | string;
  };

  export type UserCreateWithoutAuthProvidersInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workouts?: WorkoutCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseCreateNestedManyWithoutCreatorInput;
  };

  export type UserUncheckedCreateWithoutAuthProvidersInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput;
  };

  export type UserCreateOrConnectWithoutAuthProvidersInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutAuthProvidersInput, UserUncheckedCreateWithoutAuthProvidersInput>;
  };

  export type UserUpsertWithoutAuthProvidersInput = {
    update: XOR<UserUpdateWithoutAuthProvidersInput, UserUncheckedUpdateWithoutAuthProvidersInput>;
    create: XOR<UserCreateWithoutAuthProvidersInput, UserUncheckedCreateWithoutAuthProvidersInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAuthProvidersInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutAuthProvidersInput, UserUncheckedUpdateWithoutAuthProvidersInput>;
  };

  export type UserUpdateWithoutAuthProvidersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workouts?: WorkoutUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUpdateManyWithoutCreatorNestedInput;
  };

  export type UserUncheckedUpdateWithoutAuthProvidersInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUncheckedUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput;
  };

  export type UserCreateWithoutWorkoutsInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseCreateNestedManyWithoutCreatorInput;
  };

  export type UserUncheckedCreateWithoutWorkoutsInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput;
  };

  export type UserCreateOrConnectWithoutWorkoutsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>;
  };

  export type WorkoutExerciseCreateWithoutWorkoutInput = {
    id?: string;
    sortOrder: number;
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput;
    sets?: ExerciseSetCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUncheckedCreateWithoutWorkoutInput = {
    id?: string;
    exerciseId: string;
    sortOrder: number;
    sets?: ExerciseSetUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseCreateOrConnectWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput;
    create: XOR<
      WorkoutExerciseCreateWithoutWorkoutInput,
      WorkoutExerciseUncheckedCreateWithoutWorkoutInput
    >;
  };

  export type WorkoutExerciseCreateManyWorkoutInputEnvelope = {
    data: WorkoutExerciseCreateManyWorkoutInput | WorkoutExerciseCreateManyWorkoutInput[];
    skipDuplicates?: boolean;
  };

  export type WorkoutCommentCreateWithoutWorkoutInput = {
    id?: string;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
    workoutExercise?: WorkoutExerciseCreateNestedOneWithoutCommentsInput;
  };

  export type WorkoutCommentUncheckedCreateWithoutWorkoutInput = {
    id?: string;
    workoutExerciseId?: string | null;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type WorkoutCommentCreateOrConnectWithoutWorkoutInput = {
    where: WorkoutCommentWhereUniqueInput;
    create: XOR<
      WorkoutCommentCreateWithoutWorkoutInput,
      WorkoutCommentUncheckedCreateWithoutWorkoutInput
    >;
  };

  export type WorkoutCommentCreateManyWorkoutInputEnvelope = {
    data: WorkoutCommentCreateManyWorkoutInput | WorkoutCommentCreateManyWorkoutInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutWorkoutsInput = {
    update: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>;
    create: XOR<UserCreateWithoutWorkoutsInput, UserUncheckedCreateWithoutWorkoutsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutWorkoutsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutWorkoutsInput, UserUncheckedUpdateWithoutWorkoutsInput>;
  };

  export type UserUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUpdateManyWithoutCreatorNestedInput;
  };

  export type UserUncheckedUpdateWithoutWorkoutsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUncheckedUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput;
  };

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput;
    update: XOR<
      WorkoutExerciseUpdateWithoutWorkoutInput,
      WorkoutExerciseUncheckedUpdateWithoutWorkoutInput
    >;
    create: XOR<
      WorkoutExerciseCreateWithoutWorkoutInput,
      WorkoutExerciseUncheckedCreateWithoutWorkoutInput
    >;
  };

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutExerciseWhereUniqueInput;
    data: XOR<
      WorkoutExerciseUpdateWithoutWorkoutInput,
      WorkoutExerciseUncheckedUpdateWithoutWorkoutInput
    >;
  };

  export type WorkoutExerciseUpdateManyWithWhereWithoutWorkoutInput = {
    where: WorkoutExerciseScalarWhereInput;
    data: XOR<
      WorkoutExerciseUpdateManyMutationInput,
      WorkoutExerciseUncheckedUpdateManyWithoutWorkoutInput
    >;
  };

  export type WorkoutExerciseScalarWhereInput = {
    AND?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
    OR?: WorkoutExerciseScalarWhereInput[];
    NOT?: WorkoutExerciseScalarWhereInput | WorkoutExerciseScalarWhereInput[];
    id?: UuidFilter<'WorkoutExercise'> | string;
    workoutId?: UuidFilter<'WorkoutExercise'> | string;
    exerciseId?: UuidFilter<'WorkoutExercise'> | string;
    sortOrder?: IntFilter<'WorkoutExercise'> | number;
  };

  export type WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutCommentWhereUniqueInput;
    update: XOR<
      WorkoutCommentUpdateWithoutWorkoutInput,
      WorkoutCommentUncheckedUpdateWithoutWorkoutInput
    >;
    create: XOR<
      WorkoutCommentCreateWithoutWorkoutInput,
      WorkoutCommentUncheckedCreateWithoutWorkoutInput
    >;
  };

  export type WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: WorkoutCommentWhereUniqueInput;
    data: XOR<
      WorkoutCommentUpdateWithoutWorkoutInput,
      WorkoutCommentUncheckedUpdateWithoutWorkoutInput
    >;
  };

  export type WorkoutCommentUpdateManyWithWhereWithoutWorkoutInput = {
    where: WorkoutCommentScalarWhereInput;
    data: XOR<
      WorkoutCommentUpdateManyMutationInput,
      WorkoutCommentUncheckedUpdateManyWithoutWorkoutInput
    >;
  };

  export type WorkoutCommentScalarWhereInput = {
    AND?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
    OR?: WorkoutCommentScalarWhereInput[];
    NOT?: WorkoutCommentScalarWhereInput | WorkoutCommentScalarWhereInput[];
    id?: UuidFilter<'WorkoutComment'> | string;
    workoutId?: UuidFilter<'WorkoutComment'> | string;
    workoutExerciseId?: UuidNullableFilter<'WorkoutComment'> | string | null;
    commentType?: EnumCommentTypeFilter<'WorkoutComment'> | $Enums.CommentType;
    bodyPart?: StringNullableFilter<'WorkoutComment'> | string | null;
    side?: EnumBodySideNullableFilter<'WorkoutComment'> | $Enums.BodySide | null;
    sensationType?: EnumSensationTypeNullableFilter<'WorkoutComment'> | $Enums.SensationType | null;
    rawText?: StringFilter<'WorkoutComment'> | string;
    createdAt?: DateTimeFilter<'WorkoutComment'> | Date | string;
  };

  export type UserCreateWithoutCreatedExercisesInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderCreateNestedManyWithoutUserInput;
    workouts?: WorkoutCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutCreatedExercisesInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput;
    exerciseMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutCreatedExercisesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutCreatedExercisesInput,
      UserUncheckedCreateWithoutCreatedExercisesInput
    >;
  };

  export type ExerciseSynonymCreateWithoutExerciseInput = {
    id?: string;
    synonym: string;
    language: string;
  };

  export type ExerciseSynonymUncheckedCreateWithoutExerciseInput = {
    id?: string;
    synonym: string;
    language: string;
  };

  export type ExerciseSynonymCreateOrConnectWithoutExerciseInput = {
    where: ExerciseSynonymWhereUniqueInput;
    create: XOR<
      ExerciseSynonymCreateWithoutExerciseInput,
      ExerciseSynonymUncheckedCreateWithoutExerciseInput
    >;
  };

  export type ExerciseSynonymCreateManyExerciseInputEnvelope = {
    data: ExerciseSynonymCreateManyExerciseInput | ExerciseSynonymCreateManyExerciseInput[];
    skipDuplicates?: boolean;
  };

  export type WorkoutExerciseCreateWithoutExerciseInput = {
    id?: string;
    sortOrder: number;
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput;
    sets?: ExerciseSetCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUncheckedCreateWithoutExerciseInput = {
    id?: string;
    workoutId: string;
    sortOrder: number;
    sets?: ExerciseSetUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseCreateOrConnectWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput;
    create: XOR<
      WorkoutExerciseCreateWithoutExerciseInput,
      WorkoutExerciseUncheckedCreateWithoutExerciseInput
    >;
  };

  export type WorkoutExerciseCreateManyExerciseInputEnvelope = {
    data: WorkoutExerciseCreateManyExerciseInput | WorkoutExerciseCreateManyExerciseInput[];
    skipDuplicates?: boolean;
  };

  export type UserExerciseMappingCreateWithoutExerciseInput = {
    id?: string;
    inputText: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutExerciseMappingsInput;
  };

  export type UserExerciseMappingUncheckedCreateWithoutExerciseInput = {
    id?: string;
    userId: string;
    inputText: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserExerciseMappingCreateOrConnectWithoutExerciseInput = {
    where: UserExerciseMappingWhereUniqueInput;
    create: XOR<
      UserExerciseMappingCreateWithoutExerciseInput,
      UserExerciseMappingUncheckedCreateWithoutExerciseInput
    >;
  };

  export type UserExerciseMappingCreateManyExerciseInputEnvelope = {
    data: UserExerciseMappingCreateManyExerciseInput | UserExerciseMappingCreateManyExerciseInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutCreatedExercisesInput = {
    update: XOR<
      UserUpdateWithoutCreatedExercisesInput,
      UserUncheckedUpdateWithoutCreatedExercisesInput
    >;
    create: XOR<
      UserCreateWithoutCreatedExercisesInput,
      UserUncheckedCreateWithoutCreatedExercisesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutCreatedExercisesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutCreatedExercisesInput,
      UserUncheckedUpdateWithoutCreatedExercisesInput
    >;
  };

  export type UserUpdateWithoutCreatedExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutCreatedExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput;
    exerciseMappings?: UserExerciseMappingUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type ExerciseSynonymUpsertWithWhereUniqueWithoutExerciseInput = {
    where: ExerciseSynonymWhereUniqueInput;
    update: XOR<
      ExerciseSynonymUpdateWithoutExerciseInput,
      ExerciseSynonymUncheckedUpdateWithoutExerciseInput
    >;
    create: XOR<
      ExerciseSynonymCreateWithoutExerciseInput,
      ExerciseSynonymUncheckedCreateWithoutExerciseInput
    >;
  };

  export type ExerciseSynonymUpdateWithWhereUniqueWithoutExerciseInput = {
    where: ExerciseSynonymWhereUniqueInput;
    data: XOR<
      ExerciseSynonymUpdateWithoutExerciseInput,
      ExerciseSynonymUncheckedUpdateWithoutExerciseInput
    >;
  };

  export type ExerciseSynonymUpdateManyWithWhereWithoutExerciseInput = {
    where: ExerciseSynonymScalarWhereInput;
    data: XOR<
      ExerciseSynonymUpdateManyMutationInput,
      ExerciseSynonymUncheckedUpdateManyWithoutExerciseInput
    >;
  };

  export type ExerciseSynonymScalarWhereInput = {
    AND?: ExerciseSynonymScalarWhereInput | ExerciseSynonymScalarWhereInput[];
    OR?: ExerciseSynonymScalarWhereInput[];
    NOT?: ExerciseSynonymScalarWhereInput | ExerciseSynonymScalarWhereInput[];
    id?: UuidFilter<'ExerciseSynonym'> | string;
    exerciseId?: UuidFilter<'ExerciseSynonym'> | string;
    synonym?: StringFilter<'ExerciseSynonym'> | string;
    language?: StringFilter<'ExerciseSynonym'> | string;
  };

  export type WorkoutExerciseUpsertWithWhereUniqueWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput;
    update: XOR<
      WorkoutExerciseUpdateWithoutExerciseInput,
      WorkoutExerciseUncheckedUpdateWithoutExerciseInput
    >;
    create: XOR<
      WorkoutExerciseCreateWithoutExerciseInput,
      WorkoutExerciseUncheckedCreateWithoutExerciseInput
    >;
  };

  export type WorkoutExerciseUpdateWithWhereUniqueWithoutExerciseInput = {
    where: WorkoutExerciseWhereUniqueInput;
    data: XOR<
      WorkoutExerciseUpdateWithoutExerciseInput,
      WorkoutExerciseUncheckedUpdateWithoutExerciseInput
    >;
  };

  export type WorkoutExerciseUpdateManyWithWhereWithoutExerciseInput = {
    where: WorkoutExerciseScalarWhereInput;
    data: XOR<
      WorkoutExerciseUpdateManyMutationInput,
      WorkoutExerciseUncheckedUpdateManyWithoutExerciseInput
    >;
  };

  export type UserExerciseMappingUpsertWithWhereUniqueWithoutExerciseInput = {
    where: UserExerciseMappingWhereUniqueInput;
    update: XOR<
      UserExerciseMappingUpdateWithoutExerciseInput,
      UserExerciseMappingUncheckedUpdateWithoutExerciseInput
    >;
    create: XOR<
      UserExerciseMappingCreateWithoutExerciseInput,
      UserExerciseMappingUncheckedCreateWithoutExerciseInput
    >;
  };

  export type UserExerciseMappingUpdateWithWhereUniqueWithoutExerciseInput = {
    where: UserExerciseMappingWhereUniqueInput;
    data: XOR<
      UserExerciseMappingUpdateWithoutExerciseInput,
      UserExerciseMappingUncheckedUpdateWithoutExerciseInput
    >;
  };

  export type UserExerciseMappingUpdateManyWithWhereWithoutExerciseInput = {
    where: UserExerciseMappingScalarWhereInput;
    data: XOR<
      UserExerciseMappingUpdateManyMutationInput,
      UserExerciseMappingUncheckedUpdateManyWithoutExerciseInput
    >;
  };

  export type ExerciseCreateWithoutSynonymsInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    creator?: UserCreateNestedOneWithoutCreatedExercisesInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUncheckedCreateWithoutSynonymsInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdBy?: string | null;
    createdAt?: Date | string;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseCreateOrConnectWithoutSynonymsInput = {
    where: ExerciseWhereUniqueInput;
    create: XOR<ExerciseCreateWithoutSynonymsInput, ExerciseUncheckedCreateWithoutSynonymsInput>;
  };

  export type ExerciseUpsertWithoutSynonymsInput = {
    update: XOR<ExerciseUpdateWithoutSynonymsInput, ExerciseUncheckedUpdateWithoutSynonymsInput>;
    create: XOR<ExerciseCreateWithoutSynonymsInput, ExerciseUncheckedCreateWithoutSynonymsInput>;
    where?: ExerciseWhereInput;
  };

  export type ExerciseUpdateToOneWithWhereWithoutSynonymsInput = {
    where?: ExerciseWhereInput;
    data: XOR<ExerciseUpdateWithoutSynonymsInput, ExerciseUncheckedUpdateWithoutSynonymsInput>;
  };

  export type ExerciseUpdateWithoutSynonymsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    creator?: UserUpdateOneWithoutCreatedExercisesNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateWithoutSynonymsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUncheckedUpdateManyWithoutExerciseNestedInput;
  };

  export type UserCreateWithoutExerciseMappingsInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderCreateNestedManyWithoutUserInput;
    workouts?: WorkoutCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseCreateNestedManyWithoutCreatorInput;
  };

  export type UserUncheckedCreateWithoutExerciseMappingsInput = {
    id?: string;
    telegramId?: string | null;
    telegramUsername?: string | null;
    email?: string | null;
    passwordHash?: string | null;
    displayName?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authProviders?: AuthProviderUncheckedCreateNestedManyWithoutUserInput;
    workouts?: WorkoutUncheckedCreateNestedManyWithoutUserInput;
    createdExercises?: ExerciseUncheckedCreateNestedManyWithoutCreatorInput;
  };

  export type UserCreateOrConnectWithoutExerciseMappingsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutExerciseMappingsInput,
      UserUncheckedCreateWithoutExerciseMappingsInput
    >;
  };

  export type ExerciseCreateWithoutUserMappingsInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    creator?: UserCreateNestedOneWithoutCreatedExercisesInput;
    synonyms?: ExerciseSynonymCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUncheckedCreateWithoutUserMappingsInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdBy?: string | null;
    createdAt?: Date | string;
    synonyms?: ExerciseSynonymUncheckedCreateNestedManyWithoutExerciseInput;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseCreateOrConnectWithoutUserMappingsInput = {
    where: ExerciseWhereUniqueInput;
    create: XOR<
      ExerciseCreateWithoutUserMappingsInput,
      ExerciseUncheckedCreateWithoutUserMappingsInput
    >;
  };

  export type UserUpsertWithoutExerciseMappingsInput = {
    update: XOR<
      UserUpdateWithoutExerciseMappingsInput,
      UserUncheckedUpdateWithoutExerciseMappingsInput
    >;
    create: XOR<
      UserCreateWithoutExerciseMappingsInput,
      UserUncheckedCreateWithoutExerciseMappingsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutExerciseMappingsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutExerciseMappingsInput,
      UserUncheckedUpdateWithoutExerciseMappingsInput
    >;
  };

  export type UserUpdateWithoutExerciseMappingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUpdateManyWithoutCreatorNestedInput;
  };

  export type UserUncheckedUpdateWithoutExerciseMappingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null;
    telegramUsername?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null;
    displayName?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    authProviders?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput;
    workouts?: WorkoutUncheckedUpdateManyWithoutUserNestedInput;
    createdExercises?: ExerciseUncheckedUpdateManyWithoutCreatorNestedInput;
  };

  export type ExerciseUpsertWithoutUserMappingsInput = {
    update: XOR<
      ExerciseUpdateWithoutUserMappingsInput,
      ExerciseUncheckedUpdateWithoutUserMappingsInput
    >;
    create: XOR<
      ExerciseCreateWithoutUserMappingsInput,
      ExerciseUncheckedCreateWithoutUserMappingsInput
    >;
    where?: ExerciseWhereInput;
  };

  export type ExerciseUpdateToOneWithWhereWithoutUserMappingsInput = {
    where?: ExerciseWhereInput;
    data: XOR<
      ExerciseUpdateWithoutUserMappingsInput,
      ExerciseUncheckedUpdateWithoutUserMappingsInput
    >;
  };

  export type ExerciseUpdateWithoutUserMappingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    creator?: UserUpdateOneWithoutCreatedExercisesNestedInput;
    synonyms?: ExerciseSynonymUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateWithoutUserMappingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    synonyms?: ExerciseSynonymUncheckedUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput;
  };

  export type WorkoutCreateWithoutWorkoutExercisesInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutWorkoutsInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutUncheckedCreateWithoutWorkoutExercisesInput = {
    id?: string;
    userId: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutCreateOrConnectWithoutWorkoutExercisesInput = {
    where: WorkoutWhereUniqueInput;
    create: XOR<
      WorkoutCreateWithoutWorkoutExercisesInput,
      WorkoutUncheckedCreateWithoutWorkoutExercisesInput
    >;
  };

  export type ExerciseCreateWithoutWorkoutExercisesInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
    creator?: UserCreateNestedOneWithoutCreatedExercisesInput;
    synonyms?: ExerciseSynonymCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseUncheckedCreateWithoutWorkoutExercisesInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdBy?: string | null;
    createdAt?: Date | string;
    synonyms?: ExerciseSynonymUncheckedCreateNestedManyWithoutExerciseInput;
    userMappings?: UserExerciseMappingUncheckedCreateNestedManyWithoutExerciseInput;
  };

  export type ExerciseCreateOrConnectWithoutWorkoutExercisesInput = {
    where: ExerciseWhereUniqueInput;
    create: XOR<
      ExerciseCreateWithoutWorkoutExercisesInput,
      ExerciseUncheckedCreateWithoutWorkoutExercisesInput
    >;
  };

  export type ExerciseSetCreateWithoutWorkoutExerciseInput = {
    id?: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
  };

  export type ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput = {
    id?: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
  };

  export type ExerciseSetCreateOrConnectWithoutWorkoutExerciseInput = {
    where: ExerciseSetWhereUniqueInput;
    create: XOR<
      ExerciseSetCreateWithoutWorkoutExerciseInput,
      ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
    >;
  };

  export type ExerciseSetCreateManyWorkoutExerciseInputEnvelope = {
    data: ExerciseSetCreateManyWorkoutExerciseInput | ExerciseSetCreateManyWorkoutExerciseInput[];
    skipDuplicates?: boolean;
  };

  export type WorkoutCommentCreateWithoutWorkoutExerciseInput = {
    id?: string;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
    workout: WorkoutCreateNestedOneWithoutCommentsInput;
  };

  export type WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput = {
    id?: string;
    workoutId: string;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type WorkoutCommentCreateOrConnectWithoutWorkoutExerciseInput = {
    where: WorkoutCommentWhereUniqueInput;
    create: XOR<
      WorkoutCommentCreateWithoutWorkoutExerciseInput,
      WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
    >;
  };

  export type WorkoutCommentCreateManyWorkoutExerciseInputEnvelope = {
    data:
      | WorkoutCommentCreateManyWorkoutExerciseInput
      | WorkoutCommentCreateManyWorkoutExerciseInput[];
    skipDuplicates?: boolean;
  };

  export type WorkoutUpsertWithoutWorkoutExercisesInput = {
    update: XOR<
      WorkoutUpdateWithoutWorkoutExercisesInput,
      WorkoutUncheckedUpdateWithoutWorkoutExercisesInput
    >;
    create: XOR<
      WorkoutCreateWithoutWorkoutExercisesInput,
      WorkoutUncheckedCreateWithoutWorkoutExercisesInput
    >;
    where?: WorkoutWhereInput;
  };

  export type WorkoutUpdateToOneWithWhereWithoutWorkoutExercisesInput = {
    where?: WorkoutWhereInput;
    data: XOR<
      WorkoutUpdateWithoutWorkoutExercisesInput,
      WorkoutUncheckedUpdateWithoutWorkoutExercisesInput
    >;
  };

  export type WorkoutUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutWorkoutsNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutUncheckedUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutNestedInput;
  };

  export type ExerciseUpsertWithoutWorkoutExercisesInput = {
    update: XOR<
      ExerciseUpdateWithoutWorkoutExercisesInput,
      ExerciseUncheckedUpdateWithoutWorkoutExercisesInput
    >;
    create: XOR<
      ExerciseCreateWithoutWorkoutExercisesInput,
      ExerciseUncheckedCreateWithoutWorkoutExercisesInput
    >;
    where?: ExerciseWhereInput;
  };

  export type ExerciseUpdateToOneWithWhereWithoutWorkoutExercisesInput = {
    where?: ExerciseWhereInput;
    data: XOR<
      ExerciseUpdateWithoutWorkoutExercisesInput,
      ExerciseUncheckedUpdateWithoutWorkoutExercisesInput
    >;
  };

  export type ExerciseUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    creator?: UserUpdateOneWithoutCreatedExercisesNestedInput;
    synonyms?: ExerciseSynonymUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateWithoutWorkoutExercisesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    synonyms?: ExerciseSynonymUncheckedUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUncheckedUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseSetUpsertWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: ExerciseSetWhereUniqueInput;
    update: XOR<
      ExerciseSetUpdateWithoutWorkoutExerciseInput,
      ExerciseSetUncheckedUpdateWithoutWorkoutExerciseInput
    >;
    create: XOR<
      ExerciseSetCreateWithoutWorkoutExerciseInput,
      ExerciseSetUncheckedCreateWithoutWorkoutExerciseInput
    >;
  };

  export type ExerciseSetUpdateWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: ExerciseSetWhereUniqueInput;
    data: XOR<
      ExerciseSetUpdateWithoutWorkoutExerciseInput,
      ExerciseSetUncheckedUpdateWithoutWorkoutExerciseInput
    >;
  };

  export type ExerciseSetUpdateManyWithWhereWithoutWorkoutExerciseInput = {
    where: ExerciseSetScalarWhereInput;
    data: XOR<
      ExerciseSetUpdateManyMutationInput,
      ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseInput
    >;
  };

  export type ExerciseSetScalarWhereInput = {
    AND?: ExerciseSetScalarWhereInput | ExerciseSetScalarWhereInput[];
    OR?: ExerciseSetScalarWhereInput[];
    NOT?: ExerciseSetScalarWhereInput | ExerciseSetScalarWhereInput[];
    id?: UuidFilter<'ExerciseSet'> | string;
    workoutExerciseId?: UuidFilter<'ExerciseSet'> | string;
    setNumber?: IntFilter<'ExerciseSet'> | number;
    reps?: IntFilter<'ExerciseSet'> | number;
    weight?:
      | DecimalNullableFilter<'ExerciseSet'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFilter<'ExerciseSet'> | $Enums.WeightUnit;
  };

  export type WorkoutCommentUpsertWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: WorkoutCommentWhereUniqueInput;
    update: XOR<
      WorkoutCommentUpdateWithoutWorkoutExerciseInput,
      WorkoutCommentUncheckedUpdateWithoutWorkoutExerciseInput
    >;
    create: XOR<
      WorkoutCommentCreateWithoutWorkoutExerciseInput,
      WorkoutCommentUncheckedCreateWithoutWorkoutExerciseInput
    >;
  };

  export type WorkoutCommentUpdateWithWhereUniqueWithoutWorkoutExerciseInput = {
    where: WorkoutCommentWhereUniqueInput;
    data: XOR<
      WorkoutCommentUpdateWithoutWorkoutExerciseInput,
      WorkoutCommentUncheckedUpdateWithoutWorkoutExerciseInput
    >;
  };

  export type WorkoutCommentUpdateManyWithWhereWithoutWorkoutExerciseInput = {
    where: WorkoutCommentScalarWhereInput;
    data: XOR<
      WorkoutCommentUpdateManyMutationInput,
      WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseInput
    >;
  };

  export type WorkoutExerciseCreateWithoutSetsInput = {
    id?: string;
    sortOrder: number;
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput;
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput;
    comments?: WorkoutCommentCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUncheckedCreateWithoutSetsInput = {
    id?: string;
    workoutId: string;
    exerciseId: string;
    sortOrder: number;
    comments?: WorkoutCommentUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseCreateOrConnectWithoutSetsInput = {
    where: WorkoutExerciseWhereUniqueInput;
    create: XOR<
      WorkoutExerciseCreateWithoutSetsInput,
      WorkoutExerciseUncheckedCreateWithoutSetsInput
    >;
  };

  export type WorkoutExerciseUpsertWithoutSetsInput = {
    update: XOR<
      WorkoutExerciseUpdateWithoutSetsInput,
      WorkoutExerciseUncheckedUpdateWithoutSetsInput
    >;
    create: XOR<
      WorkoutExerciseCreateWithoutSetsInput,
      WorkoutExerciseUncheckedCreateWithoutSetsInput
    >;
    where?: WorkoutExerciseWhereInput;
  };

  export type WorkoutExerciseUpdateToOneWithWhereWithoutSetsInput = {
    where?: WorkoutExerciseWhereInput;
    data: XOR<
      WorkoutExerciseUpdateWithoutSetsInput,
      WorkoutExerciseUncheckedUpdateWithoutSetsInput
    >;
  };

  export type WorkoutExerciseUpdateWithoutSetsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateWithoutSetsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutCreateWithoutCommentsInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutWorkoutsInput;
    workoutExercises?: WorkoutExerciseCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutUncheckedCreateWithoutCommentsInput = {
    id?: string;
    userId: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workoutExercises?: WorkoutExerciseUncheckedCreateNestedManyWithoutWorkoutInput;
  };

  export type WorkoutCreateOrConnectWithoutCommentsInput = {
    where: WorkoutWhereUniqueInput;
    create: XOR<WorkoutCreateWithoutCommentsInput, WorkoutUncheckedCreateWithoutCommentsInput>;
  };

  export type WorkoutExerciseCreateWithoutCommentsInput = {
    id?: string;
    sortOrder: number;
    workout: WorkoutCreateNestedOneWithoutWorkoutExercisesInput;
    exercise: ExerciseCreateNestedOneWithoutWorkoutExercisesInput;
    sets?: ExerciseSetCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseUncheckedCreateWithoutCommentsInput = {
    id?: string;
    workoutId: string;
    exerciseId: string;
    sortOrder: number;
    sets?: ExerciseSetUncheckedCreateNestedManyWithoutWorkoutExerciseInput;
  };

  export type WorkoutExerciseCreateOrConnectWithoutCommentsInput = {
    where: WorkoutExerciseWhereUniqueInput;
    create: XOR<
      WorkoutExerciseCreateWithoutCommentsInput,
      WorkoutExerciseUncheckedCreateWithoutCommentsInput
    >;
  };

  export type WorkoutUpsertWithoutCommentsInput = {
    update: XOR<WorkoutUpdateWithoutCommentsInput, WorkoutUncheckedUpdateWithoutCommentsInput>;
    create: XOR<WorkoutCreateWithoutCommentsInput, WorkoutUncheckedCreateWithoutCommentsInput>;
    where?: WorkoutWhereInput;
  };

  export type WorkoutUpdateToOneWithWhereWithoutCommentsInput = {
    where?: WorkoutWhereInput;
    data: XOR<WorkoutUpdateWithoutCommentsInput, WorkoutUncheckedUpdateWithoutCommentsInput>;
  };

  export type WorkoutUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutWorkoutsNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutExerciseUpsertWithoutCommentsInput = {
    update: XOR<
      WorkoutExerciseUpdateWithoutCommentsInput,
      WorkoutExerciseUncheckedUpdateWithoutCommentsInput
    >;
    create: XOR<
      WorkoutExerciseCreateWithoutCommentsInput,
      WorkoutExerciseUncheckedCreateWithoutCommentsInput
    >;
    where?: WorkoutExerciseWhereInput;
  };

  export type WorkoutExerciseUpdateToOneWithWhereWithoutCommentsInput = {
    where?: WorkoutExerciseWhereInput;
    data: XOR<
      WorkoutExerciseUpdateWithoutCommentsInput,
      WorkoutExerciseUncheckedUpdateWithoutCommentsInput
    >;
  };

  export type WorkoutExerciseUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    sets?: ExerciseSetUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    sets?: ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type AuthProviderCreateManyUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
  };

  export type WorkoutCreateManyUserInput = {
    id?: string;
    workoutDate: Date | string;
    status?: $Enums.WorkoutStatus;
    focus?: WorkoutCreatefocusInput | string[];
    location?: string | null;
    comment?: string | null;
    rawTranscript?: string | null;
    sourceMessageId?: number | null;
    previewMessageId?: number | null;
    publishedMessageId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserExerciseMappingCreateManyUserInput = {
    id?: string;
    inputText: string;
    exerciseId: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExerciseCreateManyCreatorInput = {
    id?: string;
    canonicalName: string;
    displayNameRu?: string | null;
    displayNameEn?: string | null;
    movementPattern?: string | null;
    equipment?: string | null;
    primaryMuscles?: ExerciseCreateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseCreatesecondaryMusclesInput | string[];
    level?: string | null;
    instructions?: ExerciseCreateinstructionsInput | string[];
    exerciseType?: string | null;
    category?: $Enums.ExerciseCategory | null;
    isGlobal?: boolean;
    createdAt?: Date | string;
  };

  export type AuthProviderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthProviderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AuthProviderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerUserId?: StringFieldUpdateOperationsInput | string;
    metadata?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutWorkoutNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutWorkoutNestedInput;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutNestedInput;
  };

  export type WorkoutUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumWorkoutStatusFieldUpdateOperationsInput | $Enums.WorkoutStatus;
    focus?: WorkoutUpdatefocusInput | string[];
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    rawTranscript?: NullableStringFieldUpdateOperationsInput | string | null;
    sourceMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    previewMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    publishedMessageId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserExerciseMappingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    exercise?: ExerciseUpdateOneRequiredWithoutUserMappingsNestedInput;
  };

  export type UserExerciseMappingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserExerciseMappingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    synonyms?: ExerciseSynonymUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    synonyms?: ExerciseSynonymUncheckedUpdateManyWithoutExerciseNestedInput;
    workoutExercises?: WorkoutExerciseUncheckedUpdateManyWithoutExerciseNestedInput;
    userMappings?: UserExerciseMappingUncheckedUpdateManyWithoutExerciseNestedInput;
  };

  export type ExerciseUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string;
    canonicalName?: StringFieldUpdateOperationsInput | string;
    displayNameRu?: NullableStringFieldUpdateOperationsInput | string | null;
    displayNameEn?: NullableStringFieldUpdateOperationsInput | string | null;
    movementPattern?: NullableStringFieldUpdateOperationsInput | string | null;
    equipment?: NullableStringFieldUpdateOperationsInput | string | null;
    primaryMuscles?: ExerciseUpdateprimaryMusclesInput | string[];
    secondaryMuscles?: ExerciseUpdatesecondaryMusclesInput | string[];
    level?: NullableStringFieldUpdateOperationsInput | string | null;
    instructions?: ExerciseUpdateinstructionsInput | string[];
    exerciseType?: NullableStringFieldUpdateOperationsInput | string | null;
    category?:
      | NullableEnumExerciseCategoryFieldUpdateOperationsInput
      | $Enums.ExerciseCategory
      | null;
    isGlobal?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutExerciseCreateManyWorkoutInput = {
    id?: string;
    exerciseId: string;
    sortOrder: number;
  };

  export type WorkoutCommentCreateManyWorkoutInput = {
    id?: string;
    workoutExerciseId?: string | null;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type WorkoutExerciseUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    exercise?: ExerciseUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    sets?: ExerciseSetUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    sets?: ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    exerciseId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
  };

  export type WorkoutCommentUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workoutExercise?: WorkoutExerciseUpdateOneWithoutCommentsNestedInput;
  };

  export type WorkoutCommentUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: NullableStringFieldUpdateOperationsInput | string | null;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutCommentUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutExerciseId?: NullableStringFieldUpdateOperationsInput | string | null;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseSynonymCreateManyExerciseInput = {
    id?: string;
    synonym: string;
    language: string;
  };

  export type WorkoutExerciseCreateManyExerciseInput = {
    id?: string;
    workoutId: string;
    sortOrder: number;
  };

  export type UserExerciseMappingCreateManyExerciseInput = {
    id?: string;
    userId: string;
    inputText: string;
    useCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ExerciseSynonymUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type ExerciseSynonymUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type ExerciseSynonymUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    synonym?: StringFieldUpdateOperationsInput | string;
    language?: StringFieldUpdateOperationsInput | string;
  };

  export type WorkoutExerciseUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    workout?: WorkoutUpdateOneRequiredWithoutWorkoutExercisesNestedInput;
    sets?: ExerciseSetUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    sets?: ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
    comments?: WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseNestedInput;
  };

  export type WorkoutExerciseUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    sortOrder?: IntFieldUpdateOperationsInput | number;
  };

  export type UserExerciseMappingUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutExerciseMappingsNestedInput;
  };

  export type UserExerciseMappingUncheckedUpdateWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserExerciseMappingUncheckedUpdateManyWithoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    inputText?: StringFieldUpdateOperationsInput | string;
    useCount?: IntFieldUpdateOperationsInput | number;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ExerciseSetCreateManyWorkoutExerciseInput = {
    id?: string;
    setNumber: number;
    reps: number;
    weight?: Decimal | DecimalJsLike | number | string | null;
    unit?: $Enums.WeightUnit;
  };

  export type WorkoutCommentCreateManyWorkoutExerciseInput = {
    id?: string;
    workoutId: string;
    commentType: $Enums.CommentType;
    bodyPart?: string | null;
    side?: $Enums.BodySide | null;
    sensationType?: $Enums.SensationType | null;
    rawText: string;
    createdAt?: Date | string;
  };

  export type ExerciseSetUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type ExerciseSetUncheckedUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type ExerciseSetUncheckedUpdateManyWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    setNumber?: IntFieldUpdateOperationsInput | number;
    reps?: IntFieldUpdateOperationsInput | number;
    weight?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    unit?: EnumWeightUnitFieldUpdateOperationsInput | $Enums.WeightUnit;
  };

  export type WorkoutCommentUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    workout?: WorkoutUpdateOneRequiredWithoutCommentsNestedInput;
  };

  export type WorkoutCommentUncheckedUpdateWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WorkoutCommentUncheckedUpdateManyWithoutWorkoutExerciseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    workoutId?: StringFieldUpdateOperationsInput | string;
    commentType?: EnumCommentTypeFieldUpdateOperationsInput | $Enums.CommentType;
    bodyPart?: NullableStringFieldUpdateOperationsInput | string | null;
    side?: NullableEnumBodySideFieldUpdateOperationsInput | $Enums.BodySide | null;
    sensationType?:
      | NullableEnumSensationTypeFieldUpdateOperationsInput
      | $Enums.SensationType
      | null;
    rawText?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
