
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TaskCustomData
 * 
 */
export type TaskCustomData = $Result.DefaultSelection<Prisma.$TaskCustomDataPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Priority
 * 
 */
export type Priority = $Result.DefaultSelection<Prisma.$PriorityPayload>
/**
 * Model DailyStats
 * 
 */
export type DailyStats = $Result.DefaultSelection<Prisma.$DailyStatsPayload>
/**
 * Model WeeklyStats
 * 
 */
export type WeeklyStats = $Result.DefaultSelection<Prisma.$WeeklyStatsPayload>
/**
 * Model MonthlyStats
 * 
 */
export type MonthlyStats = $Result.DefaultSelection<Prisma.$MonthlyStatsPayload>
/**
 * Model YearlyStats
 * 
 */
export type YearlyStats = $Result.DefaultSelection<Prisma.$YearlyStatsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

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
   * `prisma.taskCustomData`: Exposes CRUD operations for the **TaskCustomData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskCustomData
    * const taskCustomData = await prisma.taskCustomData.findMany()
    * ```
    */
  get taskCustomData(): Prisma.TaskCustomDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priority`: Exposes CRUD operations for the **Priority** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Priorities
    * const priorities = await prisma.priority.findMany()
    * ```
    */
  get priority(): Prisma.PriorityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyStats`: Exposes CRUD operations for the **DailyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyStats
    * const dailyStats = await prisma.dailyStats.findMany()
    * ```
    */
  get dailyStats(): Prisma.DailyStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weeklyStats`: Exposes CRUD operations for the **WeeklyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeeklyStats
    * const weeklyStats = await prisma.weeklyStats.findMany()
    * ```
    */
  get weeklyStats(): Prisma.WeeklyStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyStats`: Exposes CRUD operations for the **MonthlyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyStats
    * const monthlyStats = await prisma.monthlyStats.findMany()
    * ```
    */
  get monthlyStats(): Prisma.MonthlyStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.yearlyStats`: Exposes CRUD operations for the **YearlyStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YearlyStats
    * const yearlyStats = await prisma.yearlyStats.findMany()
    * ```
    */
  get yearlyStats(): Prisma.YearlyStatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    TaskCustomData: 'TaskCustomData',
    Tag: 'Tag',
    Priority: 'Priority',
    DailyStats: 'DailyStats',
    WeeklyStats: 'WeeklyStats',
    MonthlyStats: 'MonthlyStats',
    YearlyStats: 'YearlyStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "taskCustomData" | "tag" | "priority" | "dailyStats" | "weeklyStats" | "monthlyStats" | "yearlyStats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TaskCustomData: {
        payload: Prisma.$TaskCustomDataPayload<ExtArgs>
        fields: Prisma.TaskCustomDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskCustomDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskCustomDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          findFirst: {
            args: Prisma.TaskCustomDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskCustomDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          findMany: {
            args: Prisma.TaskCustomDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>[]
          }
          create: {
            args: Prisma.TaskCustomDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          createMany: {
            args: Prisma.TaskCustomDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCustomDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>[]
          }
          delete: {
            args: Prisma.TaskCustomDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          update: {
            args: Prisma.TaskCustomDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          deleteMany: {
            args: Prisma.TaskCustomDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskCustomDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskCustomDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>[]
          }
          upsert: {
            args: Prisma.TaskCustomDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCustomDataPayload>
          }
          aggregate: {
            args: Prisma.TaskCustomDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskCustomData>
          }
          groupBy: {
            args: Prisma.TaskCustomDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskCustomDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCustomDataCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCustomDataCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Priority: {
        payload: Prisma.$PriorityPayload<ExtArgs>
        fields: Prisma.PriorityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriorityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriorityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          findFirst: {
            args: Prisma.PriorityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriorityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          findMany: {
            args: Prisma.PriorityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          create: {
            args: Prisma.PriorityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          createMany: {
            args: Prisma.PriorityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriorityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          delete: {
            args: Prisma.PriorityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          update: {
            args: Prisma.PriorityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          deleteMany: {
            args: Prisma.PriorityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriorityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriorityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>[]
          }
          upsert: {
            args: Prisma.PriorityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriorityPayload>
          }
          aggregate: {
            args: Prisma.PriorityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriority>
          }
          groupBy: {
            args: Prisma.PriorityGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriorityGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriorityCountArgs<ExtArgs>
            result: $Utils.Optional<PriorityCountAggregateOutputType> | number
          }
        }
      }
      DailyStats: {
        payload: Prisma.$DailyStatsPayload<ExtArgs>
        fields: Prisma.DailyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          findFirst: {
            args: Prisma.DailyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          findMany: {
            args: Prisma.DailyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>[]
          }
          create: {
            args: Prisma.DailyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          createMany: {
            args: Prisma.DailyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>[]
          }
          delete: {
            args: Prisma.DailyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          update: {
            args: Prisma.DailyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          deleteMany: {
            args: Prisma.DailyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>[]
          }
          upsert: {
            args: Prisma.DailyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyStatsPayload>
          }
          aggregate: {
            args: Prisma.DailyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyStats>
          }
          groupBy: {
            args: Prisma.DailyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<DailyStatsCountAggregateOutputType> | number
          }
        }
      }
      WeeklyStats: {
        payload: Prisma.$WeeklyStatsPayload<ExtArgs>
        fields: Prisma.WeeklyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeeklyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeeklyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          findFirst: {
            args: Prisma.WeeklyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeeklyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          findMany: {
            args: Prisma.WeeklyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>[]
          }
          create: {
            args: Prisma.WeeklyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          createMany: {
            args: Prisma.WeeklyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeeklyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>[]
          }
          delete: {
            args: Prisma.WeeklyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          update: {
            args: Prisma.WeeklyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          deleteMany: {
            args: Prisma.WeeklyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeeklyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeeklyStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>[]
          }
          upsert: {
            args: Prisma.WeeklyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeeklyStatsPayload>
          }
          aggregate: {
            args: Prisma.WeeklyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeeklyStats>
          }
          groupBy: {
            args: Prisma.WeeklyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeeklyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeeklyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<WeeklyStatsCountAggregateOutputType> | number
          }
        }
      }
      MonthlyStats: {
        payload: Prisma.$MonthlyStatsPayload<ExtArgs>
        fields: Prisma.MonthlyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          findFirst: {
            args: Prisma.MonthlyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          findMany: {
            args: Prisma.MonthlyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>[]
          }
          create: {
            args: Prisma.MonthlyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          createMany: {
            args: Prisma.MonthlyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>[]
          }
          delete: {
            args: Prisma.MonthlyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          update: {
            args: Prisma.MonthlyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyStatsPayload>
          }
          aggregate: {
            args: Prisma.MonthlyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyStats>
          }
          groupBy: {
            args: Prisma.MonthlyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyStatsCountAggregateOutputType> | number
          }
        }
      }
      YearlyStats: {
        payload: Prisma.$YearlyStatsPayload<ExtArgs>
        fields: Prisma.YearlyStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.YearlyStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.YearlyStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          findFirst: {
            args: Prisma.YearlyStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.YearlyStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          findMany: {
            args: Prisma.YearlyStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>[]
          }
          create: {
            args: Prisma.YearlyStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          createMany: {
            args: Prisma.YearlyStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.YearlyStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>[]
          }
          delete: {
            args: Prisma.YearlyStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          update: {
            args: Prisma.YearlyStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          deleteMany: {
            args: Prisma.YearlyStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.YearlyStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.YearlyStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>[]
          }
          upsert: {
            args: Prisma.YearlyStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YearlyStatsPayload>
          }
          aggregate: {
            args: Prisma.YearlyStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateYearlyStats>
          }
          groupBy: {
            args: Prisma.YearlyStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<YearlyStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.YearlyStatsCountArgs<ExtArgs>
            result: $Utils.Optional<YearlyStatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    taskCustomData?: TaskCustomDataOmit
    tag?: TagOmit
    priority?: PriorityOmit
    dailyStats?: DailyStatsOmit
    weeklyStats?: WeeklyStatsOmit
    monthlyStats?: MonthlyStatsOmit
    yearlyStats?: YearlyStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
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
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    customTasks: number
    tags: number
    dailyStats: number
    weeklyStats: number
    monthlyStats: number
    yearlyStats: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customTasks?: boolean | UserCountOutputTypeCountCustomTasksArgs
    tags?: boolean | UserCountOutputTypeCountTagsArgs
    dailyStats?: boolean | UserCountOutputTypeCountDailyStatsArgs
    weeklyStats?: boolean | UserCountOutputTypeCountWeeklyStatsArgs
    monthlyStats?: boolean | UserCountOutputTypeCountMonthlyStatsArgs
    yearlyStats?: boolean | UserCountOutputTypeCountYearlyStatsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCustomDataWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDailyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyStatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWeeklyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyStatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMonthlyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyStatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountYearlyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YearlyStatsWhereInput
  }


  /**
   * Count Type TaskCustomDataCountOutputType
   */

  export type TaskCustomDataCountOutputType = {
    tags: number
  }

  export type TaskCustomDataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | TaskCustomDataCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * TaskCustomDataCountOutputType without action
   */
  export type TaskCustomDataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomDataCountOutputType
     */
    select?: TaskCustomDataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCustomDataCountOutputType without action
   */
  export type TaskCustomDataCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    customTasks: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customTasks?: boolean | TagCountOutputTypeCountCustomTasksArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountCustomTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCustomDataWhereInput
  }


  /**
   * Count Type PriorityCountOutputType
   */

  export type PriorityCountOutputType = {
    customTasks: number
  }

  export type PriorityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customTasks?: boolean | PriorityCountOutputTypeCountCustomTasksArgs
  }

  // Custom InputTypes
  /**
   * PriorityCountOutputType without action
   */
  export type PriorityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriorityCountOutputType
     */
    select?: PriorityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PriorityCountOutputType without action
   */
  export type PriorityCountOutputTypeCountCustomTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCustomDataWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    googleId: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    subscriptionPlan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    googleId: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    subscriptionPlan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    googleId: number
    email: number
    name: number
    avatarUrl: number
    subscriptionPlan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    name?: true
    avatarUrl?: true
    subscriptionPlan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    name?: true
    avatarUrl?: true
    subscriptionPlan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    googleId?: true
    email?: true
    name?: true
    avatarUrl?: true
    subscriptionPlan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    googleId: string
    email: string
    name: string | null
    avatarUrl: string | null
    subscriptionPlan: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    subscriptionPlan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customTasks?: boolean | User$customTasksArgs<ExtArgs>
    tags?: boolean | User$tagsArgs<ExtArgs>
    dailyStats?: boolean | User$dailyStatsArgs<ExtArgs>
    weeklyStats?: boolean | User$weeklyStatsArgs<ExtArgs>
    monthlyStats?: boolean | User$monthlyStatsArgs<ExtArgs>
    yearlyStats?: boolean | User$yearlyStatsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    subscriptionPlan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleId?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    subscriptionPlan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    googleId?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    subscriptionPlan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googleId" | "email" | "name" | "avatarUrl" | "subscriptionPlan" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customTasks?: boolean | User$customTasksArgs<ExtArgs>
    tags?: boolean | User$tagsArgs<ExtArgs>
    dailyStats?: boolean | User$dailyStatsArgs<ExtArgs>
    weeklyStats?: boolean | User$weeklyStatsArgs<ExtArgs>
    monthlyStats?: boolean | User$monthlyStatsArgs<ExtArgs>
    yearlyStats?: boolean | User$yearlyStatsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customTasks: Prisma.$TaskCustomDataPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
      dailyStats: Prisma.$DailyStatsPayload<ExtArgs>[]
      weeklyStats: Prisma.$WeeklyStatsPayload<ExtArgs>[]
      monthlyStats: Prisma.$MonthlyStatsPayload<ExtArgs>[]
      yearlyStats: Prisma.$YearlyStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      googleId: string
      email: string
      name: string | null
      avatarUrl: string | null
      subscriptionPlan: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    >

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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customTasks<T extends User$customTasksArgs<ExtArgs> = {}>(args?: Subset<T, User$customTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends User$tagsArgs<ExtArgs> = {}>(args?: Subset<T, User$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dailyStats<T extends User$dailyStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$dailyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weeklyStats<T extends User$weeklyStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$weeklyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    monthlyStats<T extends User$monthlyStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$monthlyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    yearlyStats<T extends User$yearlyStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$yearlyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly subscriptionPlan: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.customTasks
   */
  export type User$customTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    where?: TaskCustomDataWhereInput
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    cursor?: TaskCustomDataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * User.tags
   */
  export type User$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * User.dailyStats
   */
  export type User$dailyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    where?: DailyStatsWhereInput
    orderBy?: DailyStatsOrderByWithRelationInput | DailyStatsOrderByWithRelationInput[]
    cursor?: DailyStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyStatsScalarFieldEnum | DailyStatsScalarFieldEnum[]
  }

  /**
   * User.weeklyStats
   */
  export type User$weeklyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    where?: WeeklyStatsWhereInput
    orderBy?: WeeklyStatsOrderByWithRelationInput | WeeklyStatsOrderByWithRelationInput[]
    cursor?: WeeklyStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeeklyStatsScalarFieldEnum | WeeklyStatsScalarFieldEnum[]
  }

  /**
   * User.monthlyStats
   */
  export type User$monthlyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    where?: MonthlyStatsWhereInput
    orderBy?: MonthlyStatsOrderByWithRelationInput | MonthlyStatsOrderByWithRelationInput[]
    cursor?: MonthlyStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyStatsScalarFieldEnum | MonthlyStatsScalarFieldEnum[]
  }

  /**
   * User.yearlyStats
   */
  export type User$yearlyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    where?: YearlyStatsWhereInput
    orderBy?: YearlyStatsOrderByWithRelationInput | YearlyStatsOrderByWithRelationInput[]
    cursor?: YearlyStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: YearlyStatsScalarFieldEnum | YearlyStatsScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TaskCustomData
   */

  export type AggregateTaskCustomData = {
    _count: TaskCustomDataCountAggregateOutputType | null
    _avg: TaskCustomDataAvgAggregateOutputType | null
    _sum: TaskCustomDataSumAggregateOutputType | null
    _min: TaskCustomDataMinAggregateOutputType | null
    _max: TaskCustomDataMaxAggregateOutputType | null
  }

  export type TaskCustomDataAvgAggregateOutputType = {
    priorityId: number | null
  }

  export type TaskCustomDataSumAggregateOutputType = {
    priorityId: number | null
  }

  export type TaskCustomDataMinAggregateOutputType = {
    id: string | null
    googleTaskId: string | null
    userId: string | null
    priorityId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCustomDataMaxAggregateOutputType = {
    id: string | null
    googleTaskId: string | null
    userId: string | null
    priorityId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCustomDataCountAggregateOutputType = {
    id: number
    googleTaskId: number
    userId: number
    priorityId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskCustomDataAvgAggregateInputType = {
    priorityId?: true
  }

  export type TaskCustomDataSumAggregateInputType = {
    priorityId?: true
  }

  export type TaskCustomDataMinAggregateInputType = {
    id?: true
    googleTaskId?: true
    userId?: true
    priorityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCustomDataMaxAggregateInputType = {
    id?: true
    googleTaskId?: true
    userId?: true
    priorityId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCustomDataCountAggregateInputType = {
    id?: true
    googleTaskId?: true
    userId?: true
    priorityId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskCustomDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCustomData to aggregate.
     */
    where?: TaskCustomDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCustomData to fetch.
     */
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskCustomDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCustomData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCustomData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskCustomData
    **/
    _count?: true | TaskCustomDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskCustomDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskCustomDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskCustomDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskCustomDataMaxAggregateInputType
  }

  export type GetTaskCustomDataAggregateType<T extends TaskCustomDataAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskCustomData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskCustomData[P]>
      : GetScalarType<T[P], AggregateTaskCustomData[P]>
  }




  export type TaskCustomDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCustomDataWhereInput
    orderBy?: TaskCustomDataOrderByWithAggregationInput | TaskCustomDataOrderByWithAggregationInput[]
    by: TaskCustomDataScalarFieldEnum[] | TaskCustomDataScalarFieldEnum
    having?: TaskCustomDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCustomDataCountAggregateInputType | true
    _avg?: TaskCustomDataAvgAggregateInputType
    _sum?: TaskCustomDataSumAggregateInputType
    _min?: TaskCustomDataMinAggregateInputType
    _max?: TaskCustomDataMaxAggregateInputType
  }

  export type TaskCustomDataGroupByOutputType = {
    id: string
    googleTaskId: string
    userId: string
    priorityId: number | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCustomDataCountAggregateOutputType | null
    _avg: TaskCustomDataAvgAggregateOutputType | null
    _sum: TaskCustomDataSumAggregateOutputType | null
    _min: TaskCustomDataMinAggregateOutputType | null
    _max: TaskCustomDataMaxAggregateOutputType | null
  }

  type GetTaskCustomDataGroupByPayload<T extends TaskCustomDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskCustomDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskCustomDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskCustomDataGroupByOutputType[P]>
            : GetScalarType<T[P], TaskCustomDataGroupByOutputType[P]>
        }
      >
    >


  export type TaskCustomDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleTaskId?: boolean
    userId?: boolean
    priorityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
    tags?: boolean | TaskCustomData$tagsArgs<ExtArgs>
    _count?: boolean | TaskCustomDataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCustomData"]>

  export type TaskCustomDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleTaskId?: boolean
    userId?: boolean
    priorityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
  }, ExtArgs["result"]["taskCustomData"]>

  export type TaskCustomDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    googleTaskId?: boolean
    userId?: boolean
    priorityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
  }, ExtArgs["result"]["taskCustomData"]>

  export type TaskCustomDataSelectScalar = {
    id?: boolean
    googleTaskId?: boolean
    userId?: boolean
    priorityId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskCustomDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googleTaskId" | "userId" | "priorityId" | "createdAt" | "updatedAt", ExtArgs["result"]["taskCustomData"]>
  export type TaskCustomDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
    tags?: boolean | TaskCustomData$tagsArgs<ExtArgs>
    _count?: boolean | TaskCustomDataCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskCustomDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
  }
  export type TaskCustomDataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    priority?: boolean | TaskCustomData$priorityArgs<ExtArgs>
  }

  export type $TaskCustomDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskCustomData"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      priority: Prisma.$PriorityPayload<ExtArgs> | null
      tags: Prisma.$TagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      googleTaskId: string
      userId: string
      priorityId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskCustomData"]>
    composites: {}
  }

  type TaskCustomDataGetPayload<S extends boolean | null | undefined | TaskCustomDataDefaultArgs> = $Result.GetResult<Prisma.$TaskCustomDataPayload, S>

  type TaskCustomDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskCustomDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCustomDataCountAggregateInputType | true
    }

  export interface TaskCustomDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskCustomData'], meta: { name: 'TaskCustomData' } }
    /**
     * Find zero or one TaskCustomData that matches the filter.
     * @param {TaskCustomDataFindUniqueArgs} args - Arguments to find a TaskCustomData
     * @example
     * // Get one TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskCustomDataFindUniqueArgs>(args: SelectSubset<T, TaskCustomDataFindUniqueArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskCustomData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskCustomDataFindUniqueOrThrowArgs} args - Arguments to find a TaskCustomData
     * @example
     * // Get one TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskCustomDataFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskCustomDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCustomData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataFindFirstArgs} args - Arguments to find a TaskCustomData
     * @example
     * // Get one TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskCustomDataFindFirstArgs>(args?: SelectSubset<T, TaskCustomDataFindFirstArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCustomData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataFindFirstOrThrowArgs} args - Arguments to find a TaskCustomData
     * @example
     * // Get one TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskCustomDataFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskCustomDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskCustomData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findMany()
     * 
     * // Get first 10 TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskCustomDataWithIdOnly = await prisma.taskCustomData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskCustomDataFindManyArgs>(args?: SelectSubset<T, TaskCustomDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskCustomData.
     * @param {TaskCustomDataCreateArgs} args - Arguments to create a TaskCustomData.
     * @example
     * // Create one TaskCustomData
     * const TaskCustomData = await prisma.taskCustomData.create({
     *   data: {
     *     // ... data to create a TaskCustomData
     *   }
     * })
     * 
     */
    create<T extends TaskCustomDataCreateArgs>(args: SelectSubset<T, TaskCustomDataCreateArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskCustomData.
     * @param {TaskCustomDataCreateManyArgs} args - Arguments to create many TaskCustomData.
     * @example
     * // Create many TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCustomDataCreateManyArgs>(args?: SelectSubset<T, TaskCustomDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskCustomData and returns the data saved in the database.
     * @param {TaskCustomDataCreateManyAndReturnArgs} args - Arguments to create many TaskCustomData.
     * @example
     * // Create many TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskCustomData and only return the `id`
     * const taskCustomDataWithIdOnly = await prisma.taskCustomData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCustomDataCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCustomDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskCustomData.
     * @param {TaskCustomDataDeleteArgs} args - Arguments to delete one TaskCustomData.
     * @example
     * // Delete one TaskCustomData
     * const TaskCustomData = await prisma.taskCustomData.delete({
     *   where: {
     *     // ... filter to delete one TaskCustomData
     *   }
     * })
     * 
     */
    delete<T extends TaskCustomDataDeleteArgs>(args: SelectSubset<T, TaskCustomDataDeleteArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskCustomData.
     * @param {TaskCustomDataUpdateArgs} args - Arguments to update one TaskCustomData.
     * @example
     * // Update one TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskCustomDataUpdateArgs>(args: SelectSubset<T, TaskCustomDataUpdateArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskCustomData.
     * @param {TaskCustomDataDeleteManyArgs} args - Arguments to filter TaskCustomData to delete.
     * @example
     * // Delete a few TaskCustomData
     * const { count } = await prisma.taskCustomData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskCustomDataDeleteManyArgs>(args?: SelectSubset<T, TaskCustomDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCustomData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskCustomDataUpdateManyArgs>(args: SelectSubset<T, TaskCustomDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCustomData and returns the data updated in the database.
     * @param {TaskCustomDataUpdateManyAndReturnArgs} args - Arguments to update many TaskCustomData.
     * @example
     * // Update many TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskCustomData and only return the `id`
     * const taskCustomDataWithIdOnly = await prisma.taskCustomData.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaskCustomDataUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskCustomDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskCustomData.
     * @param {TaskCustomDataUpsertArgs} args - Arguments to update or create a TaskCustomData.
     * @example
     * // Update or create a TaskCustomData
     * const taskCustomData = await prisma.taskCustomData.upsert({
     *   create: {
     *     // ... data to create a TaskCustomData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskCustomData we want to update
     *   }
     * })
     */
    upsert<T extends TaskCustomDataUpsertArgs>(args: SelectSubset<T, TaskCustomDataUpsertArgs<ExtArgs>>): Prisma__TaskCustomDataClient<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskCustomData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataCountArgs} args - Arguments to filter TaskCustomData to count.
     * @example
     * // Count the number of TaskCustomData
     * const count = await prisma.taskCustomData.count({
     *   where: {
     *     // ... the filter for the TaskCustomData we want to count
     *   }
     * })
    **/
    count<T extends TaskCustomDataCountArgs>(
      args?: Subset<T, TaskCustomDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCustomDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskCustomData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskCustomDataAggregateArgs>(args: Subset<T, TaskCustomDataAggregateArgs>): Prisma.PrismaPromise<GetTaskCustomDataAggregateType<T>>

    /**
     * Group by TaskCustomData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCustomDataGroupByArgs} args - Group by arguments.
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
      T extends TaskCustomDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskCustomDataGroupByArgs['orderBy'] }
        : { orderBy?: TaskCustomDataGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskCustomDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskCustomDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskCustomData model
   */
  readonly fields: TaskCustomDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskCustomData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskCustomDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    priority<T extends TaskCustomData$priorityArgs<ExtArgs> = {}>(args?: Subset<T, TaskCustomData$priorityArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends TaskCustomData$tagsArgs<ExtArgs> = {}>(args?: Subset<T, TaskCustomData$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskCustomData model
   */
  interface TaskCustomDataFieldRefs {
    readonly id: FieldRef<"TaskCustomData", 'String'>
    readonly googleTaskId: FieldRef<"TaskCustomData", 'String'>
    readonly userId: FieldRef<"TaskCustomData", 'String'>
    readonly priorityId: FieldRef<"TaskCustomData", 'Int'>
    readonly createdAt: FieldRef<"TaskCustomData", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskCustomData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskCustomData findUnique
   */
  export type TaskCustomDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter, which TaskCustomData to fetch.
     */
    where: TaskCustomDataWhereUniqueInput
  }

  /**
   * TaskCustomData findUniqueOrThrow
   */
  export type TaskCustomDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter, which TaskCustomData to fetch.
     */
    where: TaskCustomDataWhereUniqueInput
  }

  /**
   * TaskCustomData findFirst
   */
  export type TaskCustomDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter, which TaskCustomData to fetch.
     */
    where?: TaskCustomDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCustomData to fetch.
     */
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCustomData.
     */
    cursor?: TaskCustomDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCustomData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCustomData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCustomData.
     */
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * TaskCustomData findFirstOrThrow
   */
  export type TaskCustomDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter, which TaskCustomData to fetch.
     */
    where?: TaskCustomDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCustomData to fetch.
     */
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCustomData.
     */
    cursor?: TaskCustomDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCustomData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCustomData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCustomData.
     */
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * TaskCustomData findMany
   */
  export type TaskCustomDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter, which TaskCustomData to fetch.
     */
    where?: TaskCustomDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCustomData to fetch.
     */
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskCustomData.
     */
    cursor?: TaskCustomDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCustomData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCustomData.
     */
    skip?: number
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * TaskCustomData create
   */
  export type TaskCustomDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskCustomData.
     */
    data: XOR<TaskCustomDataCreateInput, TaskCustomDataUncheckedCreateInput>
  }

  /**
   * TaskCustomData createMany
   */
  export type TaskCustomDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskCustomData.
     */
    data: TaskCustomDataCreateManyInput | TaskCustomDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskCustomData createManyAndReturn
   */
  export type TaskCustomDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * The data used to create many TaskCustomData.
     */
    data: TaskCustomDataCreateManyInput | TaskCustomDataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCustomData update
   */
  export type TaskCustomDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskCustomData.
     */
    data: XOR<TaskCustomDataUpdateInput, TaskCustomDataUncheckedUpdateInput>
    /**
     * Choose, which TaskCustomData to update.
     */
    where: TaskCustomDataWhereUniqueInput
  }

  /**
   * TaskCustomData updateMany
   */
  export type TaskCustomDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskCustomData.
     */
    data: XOR<TaskCustomDataUpdateManyMutationInput, TaskCustomDataUncheckedUpdateManyInput>
    /**
     * Filter which TaskCustomData to update
     */
    where?: TaskCustomDataWhereInput
    /**
     * Limit how many TaskCustomData to update.
     */
    limit?: number
  }

  /**
   * TaskCustomData updateManyAndReturn
   */
  export type TaskCustomDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * The data used to update TaskCustomData.
     */
    data: XOR<TaskCustomDataUpdateManyMutationInput, TaskCustomDataUncheckedUpdateManyInput>
    /**
     * Filter which TaskCustomData to update
     */
    where?: TaskCustomDataWhereInput
    /**
     * Limit how many TaskCustomData to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCustomData upsert
   */
  export type TaskCustomDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskCustomData to update in case it exists.
     */
    where: TaskCustomDataWhereUniqueInput
    /**
     * In case the TaskCustomData found by the `where` argument doesn't exist, create a new TaskCustomData with this data.
     */
    create: XOR<TaskCustomDataCreateInput, TaskCustomDataUncheckedCreateInput>
    /**
     * In case the TaskCustomData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskCustomDataUpdateInput, TaskCustomDataUncheckedUpdateInput>
  }

  /**
   * TaskCustomData delete
   */
  export type TaskCustomDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    /**
     * Filter which TaskCustomData to delete.
     */
    where: TaskCustomDataWhereUniqueInput
  }

  /**
   * TaskCustomData deleteMany
   */
  export type TaskCustomDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCustomData to delete
     */
    where?: TaskCustomDataWhereInput
    /**
     * Limit how many TaskCustomData to delete.
     */
    limit?: number
  }

  /**
   * TaskCustomData.priority
   */
  export type TaskCustomData$priorityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    where?: PriorityWhereInput
  }

  /**
   * TaskCustomData.tags
   */
  export type TaskCustomData$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * TaskCustomData without action
   */
  export type TaskCustomDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    userId: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    customTasks?: boolean | Tag$customTasksArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    customTasks?: boolean | Tag$customTasksArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      customTasks: Prisma.$TaskCustomDataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
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
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
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
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customTasks<T extends Tag$customTasksArgs<ExtArgs> = {}>(args?: Subset<T, Tag$customTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly userId: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.customTasks
   */
  export type Tag$customTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    where?: TaskCustomDataWhereInput
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    cursor?: TaskCustomDataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Priority
   */

  export type AggregatePriority = {
    _count: PriorityCountAggregateOutputType | null
    _avg: PriorityAvgAggregateOutputType | null
    _sum: PrioritySumAggregateOutputType | null
    _min: PriorityMinAggregateOutputType | null
    _max: PriorityMaxAggregateOutputType | null
  }

  export type PriorityAvgAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type PrioritySumAggregateOutputType = {
    id: number | null
    level: number | null
  }

  export type PriorityMinAggregateOutputType = {
    id: number | null
    name: string | null
    level: number | null
  }

  export type PriorityMaxAggregateOutputType = {
    id: number | null
    name: string | null
    level: number | null
  }

  export type PriorityCountAggregateOutputType = {
    id: number
    name: number
    level: number
    _all: number
  }


  export type PriorityAvgAggregateInputType = {
    id?: true
    level?: true
  }

  export type PrioritySumAggregateInputType = {
    id?: true
    level?: true
  }

  export type PriorityMinAggregateInputType = {
    id?: true
    name?: true
    level?: true
  }

  export type PriorityMaxAggregateInputType = {
    id?: true
    name?: true
    level?: true
  }

  export type PriorityCountAggregateInputType = {
    id?: true
    name?: true
    level?: true
    _all?: true
  }

  export type PriorityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Priority to aggregate.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Priorities
    **/
    _count?: true | PriorityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriorityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrioritySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriorityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriorityMaxAggregateInputType
  }

  export type GetPriorityAggregateType<T extends PriorityAggregateArgs> = {
        [P in keyof T & keyof AggregatePriority]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriority[P]>
      : GetScalarType<T[P], AggregatePriority[P]>
  }




  export type PriorityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriorityWhereInput
    orderBy?: PriorityOrderByWithAggregationInput | PriorityOrderByWithAggregationInput[]
    by: PriorityScalarFieldEnum[] | PriorityScalarFieldEnum
    having?: PriorityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriorityCountAggregateInputType | true
    _avg?: PriorityAvgAggregateInputType
    _sum?: PrioritySumAggregateInputType
    _min?: PriorityMinAggregateInputType
    _max?: PriorityMaxAggregateInputType
  }

  export type PriorityGroupByOutputType = {
    id: number
    name: string
    level: number
    _count: PriorityCountAggregateOutputType | null
    _avg: PriorityAvgAggregateOutputType | null
    _sum: PrioritySumAggregateOutputType | null
    _min: PriorityMinAggregateOutputType | null
    _max: PriorityMaxAggregateOutputType | null
  }

  type GetPriorityGroupByPayload<T extends PriorityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriorityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriorityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriorityGroupByOutputType[P]>
            : GetScalarType<T[P], PriorityGroupByOutputType[P]>
        }
      >
    >


  export type PrioritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    customTasks?: boolean | Priority$customTasksArgs<ExtArgs>
    _count?: boolean | PriorityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
  }, ExtArgs["result"]["priority"]>

  export type PrioritySelectScalar = {
    id?: boolean
    name?: boolean
    level?: boolean
  }

  export type PriorityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "level", ExtArgs["result"]["priority"]>
  export type PriorityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customTasks?: boolean | Priority$customTasksArgs<ExtArgs>
    _count?: boolean | PriorityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PriorityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PriorityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PriorityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Priority"
    objects: {
      customTasks: Prisma.$TaskCustomDataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      level: number
    }, ExtArgs["result"]["priority"]>
    composites: {}
  }

  type PriorityGetPayload<S extends boolean | null | undefined | PriorityDefaultArgs> = $Result.GetResult<Prisma.$PriorityPayload, S>

  type PriorityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriorityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriorityCountAggregateInputType | true
    }

  export interface PriorityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Priority'], meta: { name: 'Priority' } }
    /**
     * Find zero or one Priority that matches the filter.
     * @param {PriorityFindUniqueArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriorityFindUniqueArgs>(args: SelectSubset<T, PriorityFindUniqueArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Priority that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriorityFindUniqueOrThrowArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriorityFindUniqueOrThrowArgs>(args: SelectSubset<T, PriorityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Priority that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindFirstArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriorityFindFirstArgs>(args?: SelectSubset<T, PriorityFindFirstArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Priority that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindFirstOrThrowArgs} args - Arguments to find a Priority
     * @example
     * // Get one Priority
     * const priority = await prisma.priority.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriorityFindFirstOrThrowArgs>(args?: SelectSubset<T, PriorityFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Priorities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Priorities
     * const priorities = await prisma.priority.findMany()
     * 
     * // Get first 10 Priorities
     * const priorities = await prisma.priority.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priorityWithIdOnly = await prisma.priority.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriorityFindManyArgs>(args?: SelectSubset<T, PriorityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Priority.
     * @param {PriorityCreateArgs} args - Arguments to create a Priority.
     * @example
     * // Create one Priority
     * const Priority = await prisma.priority.create({
     *   data: {
     *     // ... data to create a Priority
     *   }
     * })
     * 
     */
    create<T extends PriorityCreateArgs>(args: SelectSubset<T, PriorityCreateArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Priorities.
     * @param {PriorityCreateManyArgs} args - Arguments to create many Priorities.
     * @example
     * // Create many Priorities
     * const priority = await prisma.priority.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriorityCreateManyArgs>(args?: SelectSubset<T, PriorityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Priorities and returns the data saved in the database.
     * @param {PriorityCreateManyAndReturnArgs} args - Arguments to create many Priorities.
     * @example
     * // Create many Priorities
     * const priority = await prisma.priority.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Priorities and only return the `id`
     * const priorityWithIdOnly = await prisma.priority.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriorityCreateManyAndReturnArgs>(args?: SelectSubset<T, PriorityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Priority.
     * @param {PriorityDeleteArgs} args - Arguments to delete one Priority.
     * @example
     * // Delete one Priority
     * const Priority = await prisma.priority.delete({
     *   where: {
     *     // ... filter to delete one Priority
     *   }
     * })
     * 
     */
    delete<T extends PriorityDeleteArgs>(args: SelectSubset<T, PriorityDeleteArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Priority.
     * @param {PriorityUpdateArgs} args - Arguments to update one Priority.
     * @example
     * // Update one Priority
     * const priority = await prisma.priority.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriorityUpdateArgs>(args: SelectSubset<T, PriorityUpdateArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Priorities.
     * @param {PriorityDeleteManyArgs} args - Arguments to filter Priorities to delete.
     * @example
     * // Delete a few Priorities
     * const { count } = await prisma.priority.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriorityDeleteManyArgs>(args?: SelectSubset<T, PriorityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Priorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Priorities
     * const priority = await prisma.priority.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriorityUpdateManyArgs>(args: SelectSubset<T, PriorityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Priorities and returns the data updated in the database.
     * @param {PriorityUpdateManyAndReturnArgs} args - Arguments to update many Priorities.
     * @example
     * // Update many Priorities
     * const priority = await prisma.priority.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Priorities and only return the `id`
     * const priorityWithIdOnly = await prisma.priority.updateManyAndReturn({
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
    updateManyAndReturn<T extends PriorityUpdateManyAndReturnArgs>(args: SelectSubset<T, PriorityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Priority.
     * @param {PriorityUpsertArgs} args - Arguments to update or create a Priority.
     * @example
     * // Update or create a Priority
     * const priority = await prisma.priority.upsert({
     *   create: {
     *     // ... data to create a Priority
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Priority we want to update
     *   }
     * })
     */
    upsert<T extends PriorityUpsertArgs>(args: SelectSubset<T, PriorityUpsertArgs<ExtArgs>>): Prisma__PriorityClient<$Result.GetResult<Prisma.$PriorityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Priorities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityCountArgs} args - Arguments to filter Priorities to count.
     * @example
     * // Count the number of Priorities
     * const count = await prisma.priority.count({
     *   where: {
     *     // ... the filter for the Priorities we want to count
     *   }
     * })
    **/
    count<T extends PriorityCountArgs>(
      args?: Subset<T, PriorityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriorityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Priority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PriorityAggregateArgs>(args: Subset<T, PriorityAggregateArgs>): Prisma.PrismaPromise<GetPriorityAggregateType<T>>

    /**
     * Group by Priority.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriorityGroupByArgs} args - Group by arguments.
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
      T extends PriorityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriorityGroupByArgs['orderBy'] }
        : { orderBy?: PriorityGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriorityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriorityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Priority model
   */
  readonly fields: PriorityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Priority.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriorityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customTasks<T extends Priority$customTasksArgs<ExtArgs> = {}>(args?: Subset<T, Priority$customTasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCustomDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Priority model
   */
  interface PriorityFieldRefs {
    readonly id: FieldRef<"Priority", 'Int'>
    readonly name: FieldRef<"Priority", 'String'>
    readonly level: FieldRef<"Priority", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Priority findUnique
   */
  export type PriorityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority findUniqueOrThrow
   */
  export type PriorityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority findFirst
   */
  export type PriorityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Priorities.
     */
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority findFirstOrThrow
   */
  export type PriorityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priority to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Priorities.
     */
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority findMany
   */
  export type PriorityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter, which Priorities to fetch.
     */
    where?: PriorityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Priorities to fetch.
     */
    orderBy?: PriorityOrderByWithRelationInput | PriorityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Priorities.
     */
    cursor?: PriorityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Priorities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Priorities.
     */
    skip?: number
    distinct?: PriorityScalarFieldEnum | PriorityScalarFieldEnum[]
  }

  /**
   * Priority create
   */
  export type PriorityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The data needed to create a Priority.
     */
    data: XOR<PriorityCreateInput, PriorityUncheckedCreateInput>
  }

  /**
   * Priority createMany
   */
  export type PriorityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Priorities.
     */
    data: PriorityCreateManyInput | PriorityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Priority createManyAndReturn
   */
  export type PriorityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * The data used to create many Priorities.
     */
    data: PriorityCreateManyInput | PriorityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Priority update
   */
  export type PriorityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The data needed to update a Priority.
     */
    data: XOR<PriorityUpdateInput, PriorityUncheckedUpdateInput>
    /**
     * Choose, which Priority to update.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority updateMany
   */
  export type PriorityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Priorities.
     */
    data: XOR<PriorityUpdateManyMutationInput, PriorityUncheckedUpdateManyInput>
    /**
     * Filter which Priorities to update
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to update.
     */
    limit?: number
  }

  /**
   * Priority updateManyAndReturn
   */
  export type PriorityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * The data used to update Priorities.
     */
    data: XOR<PriorityUpdateManyMutationInput, PriorityUncheckedUpdateManyInput>
    /**
     * Filter which Priorities to update
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to update.
     */
    limit?: number
  }

  /**
   * Priority upsert
   */
  export type PriorityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * The filter to search for the Priority to update in case it exists.
     */
    where: PriorityWhereUniqueInput
    /**
     * In case the Priority found by the `where` argument doesn't exist, create a new Priority with this data.
     */
    create: XOR<PriorityCreateInput, PriorityUncheckedCreateInput>
    /**
     * In case the Priority was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriorityUpdateInput, PriorityUncheckedUpdateInput>
  }

  /**
   * Priority delete
   */
  export type PriorityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
    /**
     * Filter which Priority to delete.
     */
    where: PriorityWhereUniqueInput
  }

  /**
   * Priority deleteMany
   */
  export type PriorityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Priorities to delete
     */
    where?: PriorityWhereInput
    /**
     * Limit how many Priorities to delete.
     */
    limit?: number
  }

  /**
   * Priority.customTasks
   */
  export type Priority$customTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCustomData
     */
    select?: TaskCustomDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCustomData
     */
    omit?: TaskCustomDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCustomDataInclude<ExtArgs> | null
    where?: TaskCustomDataWhereInput
    orderBy?: TaskCustomDataOrderByWithRelationInput | TaskCustomDataOrderByWithRelationInput[]
    cursor?: TaskCustomDataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCustomDataScalarFieldEnum | TaskCustomDataScalarFieldEnum[]
  }

  /**
   * Priority without action
   */
  export type PriorityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Priority
     */
    select?: PrioritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Priority
     */
    omit?: PriorityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriorityInclude<ExtArgs> | null
  }


  /**
   * Model DailyStats
   */

  export type AggregateDailyStats = {
    _count: DailyStatsCountAggregateOutputType | null
    _avg: DailyStatsAvgAggregateOutputType | null
    _sum: DailyStatsSumAggregateOutputType | null
    _min: DailyStatsMinAggregateOutputType | null
    _max: DailyStatsMaxAggregateOutputType | null
  }

  export type DailyStatsAvgAggregateOutputType = {
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type DailyStatsSumAggregateOutputType = {
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type DailyStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyStatsCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    completedCount: number
    createdCount: number
    completionRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyStatsAvgAggregateInputType = {
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type DailyStatsSumAggregateInputType = {
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type DailyStatsMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyStatsCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyStats to aggregate.
     */
    where?: DailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatsOrderByWithRelationInput | DailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyStats
    **/
    _count?: true | DailyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyStatsMaxAggregateInputType
  }

  export type GetDailyStatsAggregateType<T extends DailyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyStats[P]>
      : GetScalarType<T[P], AggregateDailyStats[P]>
  }




  export type DailyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyStatsWhereInput
    orderBy?: DailyStatsOrderByWithAggregationInput | DailyStatsOrderByWithAggregationInput[]
    by: DailyStatsScalarFieldEnum[] | DailyStatsScalarFieldEnum
    having?: DailyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyStatsCountAggregateInputType | true
    _avg?: DailyStatsAvgAggregateInputType
    _sum?: DailyStatsSumAggregateInputType
    _min?: DailyStatsMinAggregateInputType
    _max?: DailyStatsMaxAggregateInputType
  }

  export type DailyStatsGroupByOutputType = {
    id: string
    userId: string
    date: Date
    completedCount: number
    createdCount: number
    completionRate: number | null
    createdAt: Date
    updatedAt: Date
    _count: DailyStatsCountAggregateOutputType | null
    _avg: DailyStatsAvgAggregateOutputType | null
    _sum: DailyStatsSumAggregateOutputType | null
    _min: DailyStatsMinAggregateOutputType | null
    _max: DailyStatsMaxAggregateOutputType | null
  }

  type GetDailyStatsGroupByPayload<T extends DailyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], DailyStatsGroupByOutputType[P]>
        }
      >
    >


  export type DailyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyStats"]>

  export type DailyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyStats"]>

  export type DailyStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyStats"]>

  export type DailyStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "completedCount" | "createdCount" | "completionRate" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyStats"]>
  export type DailyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DailyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      completedCount: number
      createdCount: number
      completionRate: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyStats"]>
    composites: {}
  }

  type DailyStatsGetPayload<S extends boolean | null | undefined | DailyStatsDefaultArgs> = $Result.GetResult<Prisma.$DailyStatsPayload, S>

  type DailyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyStatsCountAggregateInputType | true
    }

  export interface DailyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyStats'], meta: { name: 'DailyStats' } }
    /**
     * Find zero or one DailyStats that matches the filter.
     * @param {DailyStatsFindUniqueArgs} args - Arguments to find a DailyStats
     * @example
     * // Get one DailyStats
     * const dailyStats = await prisma.dailyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyStatsFindUniqueArgs>(args: SelectSubset<T, DailyStatsFindUniqueArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyStatsFindUniqueOrThrowArgs} args - Arguments to find a DailyStats
     * @example
     * // Get one DailyStats
     * const dailyStats = await prisma.dailyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsFindFirstArgs} args - Arguments to find a DailyStats
     * @example
     * // Get one DailyStats
     * const dailyStats = await prisma.dailyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyStatsFindFirstArgs>(args?: SelectSubset<T, DailyStatsFindFirstArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsFindFirstOrThrowArgs} args - Arguments to find a DailyStats
     * @example
     * // Get one DailyStats
     * const dailyStats = await prisma.dailyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyStats
     * const dailyStats = await prisma.dailyStats.findMany()
     * 
     * // Get first 10 DailyStats
     * const dailyStats = await prisma.dailyStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyStatsWithIdOnly = await prisma.dailyStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyStatsFindManyArgs>(args?: SelectSubset<T, DailyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyStats.
     * @param {DailyStatsCreateArgs} args - Arguments to create a DailyStats.
     * @example
     * // Create one DailyStats
     * const DailyStats = await prisma.dailyStats.create({
     *   data: {
     *     // ... data to create a DailyStats
     *   }
     * })
     * 
     */
    create<T extends DailyStatsCreateArgs>(args: SelectSubset<T, DailyStatsCreateArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyStats.
     * @param {DailyStatsCreateManyArgs} args - Arguments to create many DailyStats.
     * @example
     * // Create many DailyStats
     * const dailyStats = await prisma.dailyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyStatsCreateManyArgs>(args?: SelectSubset<T, DailyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyStats and returns the data saved in the database.
     * @param {DailyStatsCreateManyAndReturnArgs} args - Arguments to create many DailyStats.
     * @example
     * // Create many DailyStats
     * const dailyStats = await prisma.dailyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyStats and only return the `id`
     * const dailyStatsWithIdOnly = await prisma.dailyStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyStats.
     * @param {DailyStatsDeleteArgs} args - Arguments to delete one DailyStats.
     * @example
     * // Delete one DailyStats
     * const DailyStats = await prisma.dailyStats.delete({
     *   where: {
     *     // ... filter to delete one DailyStats
     *   }
     * })
     * 
     */
    delete<T extends DailyStatsDeleteArgs>(args: SelectSubset<T, DailyStatsDeleteArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyStats.
     * @param {DailyStatsUpdateArgs} args - Arguments to update one DailyStats.
     * @example
     * // Update one DailyStats
     * const dailyStats = await prisma.dailyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyStatsUpdateArgs>(args: SelectSubset<T, DailyStatsUpdateArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyStats.
     * @param {DailyStatsDeleteManyArgs} args - Arguments to filter DailyStats to delete.
     * @example
     * // Delete a few DailyStats
     * const { count } = await prisma.dailyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyStatsDeleteManyArgs>(args?: SelectSubset<T, DailyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyStats
     * const dailyStats = await prisma.dailyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyStatsUpdateManyArgs>(args: SelectSubset<T, DailyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyStats and returns the data updated in the database.
     * @param {DailyStatsUpdateManyAndReturnArgs} args - Arguments to update many DailyStats.
     * @example
     * // Update many DailyStats
     * const dailyStats = await prisma.dailyStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyStats and only return the `id`
     * const dailyStatsWithIdOnly = await prisma.dailyStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends DailyStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyStats.
     * @param {DailyStatsUpsertArgs} args - Arguments to update or create a DailyStats.
     * @example
     * // Update or create a DailyStats
     * const dailyStats = await prisma.dailyStats.upsert({
     *   create: {
     *     // ... data to create a DailyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyStats we want to update
     *   }
     * })
     */
    upsert<T extends DailyStatsUpsertArgs>(args: SelectSubset<T, DailyStatsUpsertArgs<ExtArgs>>): Prisma__DailyStatsClient<$Result.GetResult<Prisma.$DailyStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsCountArgs} args - Arguments to filter DailyStats to count.
     * @example
     * // Count the number of DailyStats
     * const count = await prisma.dailyStats.count({
     *   where: {
     *     // ... the filter for the DailyStats we want to count
     *   }
     * })
    **/
    count<T extends DailyStatsCountArgs>(
      args?: Subset<T, DailyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyStatsAggregateArgs>(args: Subset<T, DailyStatsAggregateArgs>): Prisma.PrismaPromise<GetDailyStatsAggregateType<T>>

    /**
     * Group by DailyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyStatsGroupByArgs} args - Group by arguments.
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
      T extends DailyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyStatsGroupByArgs['orderBy'] }
        : { orderBy?: DailyStatsGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyStats model
   */
  readonly fields: DailyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyStats model
   */
  interface DailyStatsFieldRefs {
    readonly id: FieldRef<"DailyStats", 'String'>
    readonly userId: FieldRef<"DailyStats", 'String'>
    readonly date: FieldRef<"DailyStats", 'DateTime'>
    readonly completedCount: FieldRef<"DailyStats", 'Int'>
    readonly createdCount: FieldRef<"DailyStats", 'Int'>
    readonly completionRate: FieldRef<"DailyStats", 'Float'>
    readonly createdAt: FieldRef<"DailyStats", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyStats findUnique
   */
  export type DailyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where: DailyStatsWhereUniqueInput
  }

  /**
   * DailyStats findUniqueOrThrow
   */
  export type DailyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where: DailyStatsWhereUniqueInput
  }

  /**
   * DailyStats findFirst
   */
  export type DailyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where?: DailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatsOrderByWithRelationInput | DailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyStats.
     */
    cursor?: DailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyStats.
     */
    distinct?: DailyStatsScalarFieldEnum | DailyStatsScalarFieldEnum[]
  }

  /**
   * DailyStats findFirstOrThrow
   */
  export type DailyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where?: DailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatsOrderByWithRelationInput | DailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyStats.
     */
    cursor?: DailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyStats.
     */
    distinct?: DailyStatsScalarFieldEnum | DailyStatsScalarFieldEnum[]
  }

  /**
   * DailyStats findMany
   */
  export type DailyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter, which DailyStats to fetch.
     */
    where?: DailyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyStats to fetch.
     */
    orderBy?: DailyStatsOrderByWithRelationInput | DailyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyStats.
     */
    cursor?: DailyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyStats.
     */
    skip?: number
    distinct?: DailyStatsScalarFieldEnum | DailyStatsScalarFieldEnum[]
  }

  /**
   * DailyStats create
   */
  export type DailyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyStats.
     */
    data: XOR<DailyStatsCreateInput, DailyStatsUncheckedCreateInput>
  }

  /**
   * DailyStats createMany
   */
  export type DailyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyStats.
     */
    data: DailyStatsCreateManyInput | DailyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyStats createManyAndReturn
   */
  export type DailyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * The data used to create many DailyStats.
     */
    data: DailyStatsCreateManyInput | DailyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyStats update
   */
  export type DailyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyStats.
     */
    data: XOR<DailyStatsUpdateInput, DailyStatsUncheckedUpdateInput>
    /**
     * Choose, which DailyStats to update.
     */
    where: DailyStatsWhereUniqueInput
  }

  /**
   * DailyStats updateMany
   */
  export type DailyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyStats.
     */
    data: XOR<DailyStatsUpdateManyMutationInput, DailyStatsUncheckedUpdateManyInput>
    /**
     * Filter which DailyStats to update
     */
    where?: DailyStatsWhereInput
    /**
     * Limit how many DailyStats to update.
     */
    limit?: number
  }

  /**
   * DailyStats updateManyAndReturn
   */
  export type DailyStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * The data used to update DailyStats.
     */
    data: XOR<DailyStatsUpdateManyMutationInput, DailyStatsUncheckedUpdateManyInput>
    /**
     * Filter which DailyStats to update
     */
    where?: DailyStatsWhereInput
    /**
     * Limit how many DailyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyStats upsert
   */
  export type DailyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyStats to update in case it exists.
     */
    where: DailyStatsWhereUniqueInput
    /**
     * In case the DailyStats found by the `where` argument doesn't exist, create a new DailyStats with this data.
     */
    create: XOR<DailyStatsCreateInput, DailyStatsUncheckedCreateInput>
    /**
     * In case the DailyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyStatsUpdateInput, DailyStatsUncheckedUpdateInput>
  }

  /**
   * DailyStats delete
   */
  export type DailyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
    /**
     * Filter which DailyStats to delete.
     */
    where: DailyStatsWhereUniqueInput
  }

  /**
   * DailyStats deleteMany
   */
  export type DailyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyStats to delete
     */
    where?: DailyStatsWhereInput
    /**
     * Limit how many DailyStats to delete.
     */
    limit?: number
  }

  /**
   * DailyStats without action
   */
  export type DailyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyStats
     */
    select?: DailyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyStats
     */
    omit?: DailyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyStatsInclude<ExtArgs> | null
  }


  /**
   * Model WeeklyStats
   */

  export type AggregateWeeklyStats = {
    _count: WeeklyStatsCountAggregateOutputType | null
    _avg: WeeklyStatsAvgAggregateOutputType | null
    _sum: WeeklyStatsSumAggregateOutputType | null
    _min: WeeklyStatsMinAggregateOutputType | null
    _max: WeeklyStatsMaxAggregateOutputType | null
  }

  export type WeeklyStatsAvgAggregateOutputType = {
    year: number | null
    weekOfYear: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type WeeklyStatsSumAggregateOutputType = {
    year: number | null
    weekOfYear: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type WeeklyStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    weekOfYear: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    weekOfYear: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeeklyStatsCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    weekOfYear: number
    completedCount: number
    createdCount: number
    completionRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeeklyStatsAvgAggregateInputType = {
    year?: true
    weekOfYear?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type WeeklyStatsSumAggregateInputType = {
    year?: true
    weekOfYear?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type WeeklyStatsMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    weekOfYear?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    weekOfYear?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeeklyStatsCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    weekOfYear?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeeklyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyStats to aggregate.
     */
    where?: WeeklyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyStats to fetch.
     */
    orderBy?: WeeklyStatsOrderByWithRelationInput | WeeklyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeeklyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeeklyStats
    **/
    _count?: true | WeeklyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeeklyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeeklyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeeklyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeeklyStatsMaxAggregateInputType
  }

  export type GetWeeklyStatsAggregateType<T extends WeeklyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateWeeklyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeeklyStats[P]>
      : GetScalarType<T[P], AggregateWeeklyStats[P]>
  }




  export type WeeklyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeeklyStatsWhereInput
    orderBy?: WeeklyStatsOrderByWithAggregationInput | WeeklyStatsOrderByWithAggregationInput[]
    by: WeeklyStatsScalarFieldEnum[] | WeeklyStatsScalarFieldEnum
    having?: WeeklyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeeklyStatsCountAggregateInputType | true
    _avg?: WeeklyStatsAvgAggregateInputType
    _sum?: WeeklyStatsSumAggregateInputType
    _min?: WeeklyStatsMinAggregateInputType
    _max?: WeeklyStatsMaxAggregateInputType
  }

  export type WeeklyStatsGroupByOutputType = {
    id: string
    userId: string
    year: number
    weekOfYear: number
    completedCount: number
    createdCount: number
    completionRate: number | null
    createdAt: Date
    updatedAt: Date
    _count: WeeklyStatsCountAggregateOutputType | null
    _avg: WeeklyStatsAvgAggregateOutputType | null
    _sum: WeeklyStatsSumAggregateOutputType | null
    _min: WeeklyStatsMinAggregateOutputType | null
    _max: WeeklyStatsMaxAggregateOutputType | null
  }

  type GetWeeklyStatsGroupByPayload<T extends WeeklyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeeklyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeeklyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeeklyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], WeeklyStatsGroupByOutputType[P]>
        }
      >
    >


  export type WeeklyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    weekOfYear?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyStats"]>

  export type WeeklyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    weekOfYear?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyStats"]>

  export type WeeklyStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    weekOfYear?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weeklyStats"]>

  export type WeeklyStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    weekOfYear?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeeklyStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "weekOfYear" | "completedCount" | "createdCount" | "completionRate" | "createdAt" | "updatedAt", ExtArgs["result"]["weeklyStats"]>
  export type WeeklyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeeklyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WeeklyStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WeeklyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeeklyStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      weekOfYear: number
      completedCount: number
      createdCount: number
      completionRate: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weeklyStats"]>
    composites: {}
  }

  type WeeklyStatsGetPayload<S extends boolean | null | undefined | WeeklyStatsDefaultArgs> = $Result.GetResult<Prisma.$WeeklyStatsPayload, S>

  type WeeklyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeeklyStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeeklyStatsCountAggregateInputType | true
    }

  export interface WeeklyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeeklyStats'], meta: { name: 'WeeklyStats' } }
    /**
     * Find zero or one WeeklyStats that matches the filter.
     * @param {WeeklyStatsFindUniqueArgs} args - Arguments to find a WeeklyStats
     * @example
     * // Get one WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeeklyStatsFindUniqueArgs>(args: SelectSubset<T, WeeklyStatsFindUniqueArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeeklyStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeeklyStatsFindUniqueOrThrowArgs} args - Arguments to find a WeeklyStats
     * @example
     * // Get one WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeeklyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, WeeklyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsFindFirstArgs} args - Arguments to find a WeeklyStats
     * @example
     * // Get one WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeeklyStatsFindFirstArgs>(args?: SelectSubset<T, WeeklyStatsFindFirstArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeeklyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsFindFirstOrThrowArgs} args - Arguments to find a WeeklyStats
     * @example
     * // Get one WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeeklyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, WeeklyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeeklyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findMany()
     * 
     * // Get first 10 WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weeklyStatsWithIdOnly = await prisma.weeklyStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeeklyStatsFindManyArgs>(args?: SelectSubset<T, WeeklyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeeklyStats.
     * @param {WeeklyStatsCreateArgs} args - Arguments to create a WeeklyStats.
     * @example
     * // Create one WeeklyStats
     * const WeeklyStats = await prisma.weeklyStats.create({
     *   data: {
     *     // ... data to create a WeeklyStats
     *   }
     * })
     * 
     */
    create<T extends WeeklyStatsCreateArgs>(args: SelectSubset<T, WeeklyStatsCreateArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeeklyStats.
     * @param {WeeklyStatsCreateManyArgs} args - Arguments to create many WeeklyStats.
     * @example
     * // Create many WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeeklyStatsCreateManyArgs>(args?: SelectSubset<T, WeeklyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeeklyStats and returns the data saved in the database.
     * @param {WeeklyStatsCreateManyAndReturnArgs} args - Arguments to create many WeeklyStats.
     * @example
     * // Create many WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeeklyStats and only return the `id`
     * const weeklyStatsWithIdOnly = await prisma.weeklyStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeeklyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, WeeklyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeeklyStats.
     * @param {WeeklyStatsDeleteArgs} args - Arguments to delete one WeeklyStats.
     * @example
     * // Delete one WeeklyStats
     * const WeeklyStats = await prisma.weeklyStats.delete({
     *   where: {
     *     // ... filter to delete one WeeklyStats
     *   }
     * })
     * 
     */
    delete<T extends WeeklyStatsDeleteArgs>(args: SelectSubset<T, WeeklyStatsDeleteArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeeklyStats.
     * @param {WeeklyStatsUpdateArgs} args - Arguments to update one WeeklyStats.
     * @example
     * // Update one WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeeklyStatsUpdateArgs>(args: SelectSubset<T, WeeklyStatsUpdateArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeeklyStats.
     * @param {WeeklyStatsDeleteManyArgs} args - Arguments to filter WeeklyStats to delete.
     * @example
     * // Delete a few WeeklyStats
     * const { count } = await prisma.weeklyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeeklyStatsDeleteManyArgs>(args?: SelectSubset<T, WeeklyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeeklyStatsUpdateManyArgs>(args: SelectSubset<T, WeeklyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeeklyStats and returns the data updated in the database.
     * @param {WeeklyStatsUpdateManyAndReturnArgs} args - Arguments to update many WeeklyStats.
     * @example
     * // Update many WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeeklyStats and only return the `id`
     * const weeklyStatsWithIdOnly = await prisma.weeklyStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends WeeklyStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, WeeklyStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeeklyStats.
     * @param {WeeklyStatsUpsertArgs} args - Arguments to update or create a WeeklyStats.
     * @example
     * // Update or create a WeeklyStats
     * const weeklyStats = await prisma.weeklyStats.upsert({
     *   create: {
     *     // ... data to create a WeeklyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeeklyStats we want to update
     *   }
     * })
     */
    upsert<T extends WeeklyStatsUpsertArgs>(args: SelectSubset<T, WeeklyStatsUpsertArgs<ExtArgs>>): Prisma__WeeklyStatsClient<$Result.GetResult<Prisma.$WeeklyStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeeklyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsCountArgs} args - Arguments to filter WeeklyStats to count.
     * @example
     * // Count the number of WeeklyStats
     * const count = await prisma.weeklyStats.count({
     *   where: {
     *     // ... the filter for the WeeklyStats we want to count
     *   }
     * })
    **/
    count<T extends WeeklyStatsCountArgs>(
      args?: Subset<T, WeeklyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeeklyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeeklyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WeeklyStatsAggregateArgs>(args: Subset<T, WeeklyStatsAggregateArgs>): Prisma.PrismaPromise<GetWeeklyStatsAggregateType<T>>

    /**
     * Group by WeeklyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeeklyStatsGroupByArgs} args - Group by arguments.
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
      T extends WeeklyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeeklyStatsGroupByArgs['orderBy'] }
        : { orderBy?: WeeklyStatsGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeeklyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeeklyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeeklyStats model
   */
  readonly fields: WeeklyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeeklyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeeklyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeeklyStats model
   */
  interface WeeklyStatsFieldRefs {
    readonly id: FieldRef<"WeeklyStats", 'String'>
    readonly userId: FieldRef<"WeeklyStats", 'String'>
    readonly year: FieldRef<"WeeklyStats", 'Int'>
    readonly weekOfYear: FieldRef<"WeeklyStats", 'Int'>
    readonly completedCount: FieldRef<"WeeklyStats", 'Int'>
    readonly createdCount: FieldRef<"WeeklyStats", 'Int'>
    readonly completionRate: FieldRef<"WeeklyStats", 'Float'>
    readonly createdAt: FieldRef<"WeeklyStats", 'DateTime'>
    readonly updatedAt: FieldRef<"WeeklyStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeeklyStats findUnique
   */
  export type WeeklyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyStats to fetch.
     */
    where: WeeklyStatsWhereUniqueInput
  }

  /**
   * WeeklyStats findUniqueOrThrow
   */
  export type WeeklyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyStats to fetch.
     */
    where: WeeklyStatsWhereUniqueInput
  }

  /**
   * WeeklyStats findFirst
   */
  export type WeeklyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyStats to fetch.
     */
    where?: WeeklyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyStats to fetch.
     */
    orderBy?: WeeklyStatsOrderByWithRelationInput | WeeklyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyStats.
     */
    cursor?: WeeklyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyStats.
     */
    distinct?: WeeklyStatsScalarFieldEnum | WeeklyStatsScalarFieldEnum[]
  }

  /**
   * WeeklyStats findFirstOrThrow
   */
  export type WeeklyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyStats to fetch.
     */
    where?: WeeklyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyStats to fetch.
     */
    orderBy?: WeeklyStatsOrderByWithRelationInput | WeeklyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeeklyStats.
     */
    cursor?: WeeklyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeeklyStats.
     */
    distinct?: WeeklyStatsScalarFieldEnum | WeeklyStatsScalarFieldEnum[]
  }

  /**
   * WeeklyStats findMany
   */
  export type WeeklyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter, which WeeklyStats to fetch.
     */
    where?: WeeklyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeeklyStats to fetch.
     */
    orderBy?: WeeklyStatsOrderByWithRelationInput | WeeklyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeeklyStats.
     */
    cursor?: WeeklyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeeklyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeeklyStats.
     */
    skip?: number
    distinct?: WeeklyStatsScalarFieldEnum | WeeklyStatsScalarFieldEnum[]
  }

  /**
   * WeeklyStats create
   */
  export type WeeklyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a WeeklyStats.
     */
    data: XOR<WeeklyStatsCreateInput, WeeklyStatsUncheckedCreateInput>
  }

  /**
   * WeeklyStats createMany
   */
  export type WeeklyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeeklyStats.
     */
    data: WeeklyStatsCreateManyInput | WeeklyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeeklyStats createManyAndReturn
   */
  export type WeeklyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * The data used to create many WeeklyStats.
     */
    data: WeeklyStatsCreateManyInput | WeeklyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyStats update
   */
  export type WeeklyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a WeeklyStats.
     */
    data: XOR<WeeklyStatsUpdateInput, WeeklyStatsUncheckedUpdateInput>
    /**
     * Choose, which WeeklyStats to update.
     */
    where: WeeklyStatsWhereUniqueInput
  }

  /**
   * WeeklyStats updateMany
   */
  export type WeeklyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeeklyStats.
     */
    data: XOR<WeeklyStatsUpdateManyMutationInput, WeeklyStatsUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyStats to update
     */
    where?: WeeklyStatsWhereInput
    /**
     * Limit how many WeeklyStats to update.
     */
    limit?: number
  }

  /**
   * WeeklyStats updateManyAndReturn
   */
  export type WeeklyStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * The data used to update WeeklyStats.
     */
    data: XOR<WeeklyStatsUpdateManyMutationInput, WeeklyStatsUncheckedUpdateManyInput>
    /**
     * Filter which WeeklyStats to update
     */
    where?: WeeklyStatsWhereInput
    /**
     * Limit how many WeeklyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeeklyStats upsert
   */
  export type WeeklyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the WeeklyStats to update in case it exists.
     */
    where: WeeklyStatsWhereUniqueInput
    /**
     * In case the WeeklyStats found by the `where` argument doesn't exist, create a new WeeklyStats with this data.
     */
    create: XOR<WeeklyStatsCreateInput, WeeklyStatsUncheckedCreateInput>
    /**
     * In case the WeeklyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeeklyStatsUpdateInput, WeeklyStatsUncheckedUpdateInput>
  }

  /**
   * WeeklyStats delete
   */
  export type WeeklyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
    /**
     * Filter which WeeklyStats to delete.
     */
    where: WeeklyStatsWhereUniqueInput
  }

  /**
   * WeeklyStats deleteMany
   */
  export type WeeklyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeeklyStats to delete
     */
    where?: WeeklyStatsWhereInput
    /**
     * Limit how many WeeklyStats to delete.
     */
    limit?: number
  }

  /**
   * WeeklyStats without action
   */
  export type WeeklyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeeklyStats
     */
    select?: WeeklyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeeklyStats
     */
    omit?: WeeklyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeeklyStatsInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyStats
   */

  export type AggregateMonthlyStats = {
    _count: MonthlyStatsCountAggregateOutputType | null
    _avg: MonthlyStatsAvgAggregateOutputType | null
    _sum: MonthlyStatsSumAggregateOutputType | null
    _min: MonthlyStatsMinAggregateOutputType | null
    _max: MonthlyStatsMaxAggregateOutputType | null
  }

  export type MonthlyStatsAvgAggregateOutputType = {
    year: number | null
    month: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type MonthlyStatsSumAggregateOutputType = {
    year: number | null
    month: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type MonthlyStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    month: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyStatsCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    month: number
    completedCount: number
    createdCount: number
    completionRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MonthlyStatsAvgAggregateInputType = {
    year?: true
    month?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type MonthlyStatsSumAggregateInputType = {
    year?: true
    month?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type MonthlyStatsMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyStatsCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    month?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MonthlyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyStats to aggregate.
     */
    where?: MonthlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyStats to fetch.
     */
    orderBy?: MonthlyStatsOrderByWithRelationInput | MonthlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyStats
    **/
    _count?: true | MonthlyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyStatsMaxAggregateInputType
  }

  export type GetMonthlyStatsAggregateType<T extends MonthlyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyStats[P]>
      : GetScalarType<T[P], AggregateMonthlyStats[P]>
  }




  export type MonthlyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyStatsWhereInput
    orderBy?: MonthlyStatsOrderByWithAggregationInput | MonthlyStatsOrderByWithAggregationInput[]
    by: MonthlyStatsScalarFieldEnum[] | MonthlyStatsScalarFieldEnum
    having?: MonthlyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyStatsCountAggregateInputType | true
    _avg?: MonthlyStatsAvgAggregateInputType
    _sum?: MonthlyStatsSumAggregateInputType
    _min?: MonthlyStatsMinAggregateInputType
    _max?: MonthlyStatsMaxAggregateInputType
  }

  export type MonthlyStatsGroupByOutputType = {
    id: string
    userId: string
    year: number
    month: number
    completedCount: number
    createdCount: number
    completionRate: number | null
    createdAt: Date
    updatedAt: Date
    _count: MonthlyStatsCountAggregateOutputType | null
    _avg: MonthlyStatsAvgAggregateOutputType | null
    _sum: MonthlyStatsSumAggregateOutputType | null
    _min: MonthlyStatsMinAggregateOutputType | null
    _max: MonthlyStatsMaxAggregateOutputType | null
  }

  type GetMonthlyStatsGroupByPayload<T extends MonthlyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyStatsGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyStats"]>

  export type MonthlyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyStats"]>

  export type MonthlyStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyStats"]>

  export type MonthlyStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    month?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MonthlyStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "month" | "completedCount" | "createdCount" | "completionRate" | "createdAt" | "updatedAt", ExtArgs["result"]["monthlyStats"]>
  export type MonthlyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MonthlyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MonthlyStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MonthlyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      month: number
      completedCount: number
      createdCount: number
      completionRate: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["monthlyStats"]>
    composites: {}
  }

  type MonthlyStatsGetPayload<S extends boolean | null | undefined | MonthlyStatsDefaultArgs> = $Result.GetResult<Prisma.$MonthlyStatsPayload, S>

  type MonthlyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyStatsCountAggregateInputType | true
    }

  export interface MonthlyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyStats'], meta: { name: 'MonthlyStats' } }
    /**
     * Find zero or one MonthlyStats that matches the filter.
     * @param {MonthlyStatsFindUniqueArgs} args - Arguments to find a MonthlyStats
     * @example
     * // Get one MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyStatsFindUniqueArgs>(args: SelectSubset<T, MonthlyStatsFindUniqueArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyStatsFindUniqueOrThrowArgs} args - Arguments to find a MonthlyStats
     * @example
     * // Get one MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsFindFirstArgs} args - Arguments to find a MonthlyStats
     * @example
     * // Get one MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyStatsFindFirstArgs>(args?: SelectSubset<T, MonthlyStatsFindFirstArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsFindFirstOrThrowArgs} args - Arguments to find a MonthlyStats
     * @example
     * // Get one MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findMany()
     * 
     * // Get first 10 MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyStatsWithIdOnly = await prisma.monthlyStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyStatsFindManyArgs>(args?: SelectSubset<T, MonthlyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyStats.
     * @param {MonthlyStatsCreateArgs} args - Arguments to create a MonthlyStats.
     * @example
     * // Create one MonthlyStats
     * const MonthlyStats = await prisma.monthlyStats.create({
     *   data: {
     *     // ... data to create a MonthlyStats
     *   }
     * })
     * 
     */
    create<T extends MonthlyStatsCreateArgs>(args: SelectSubset<T, MonthlyStatsCreateArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyStats.
     * @param {MonthlyStatsCreateManyArgs} args - Arguments to create many MonthlyStats.
     * @example
     * // Create many MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyStatsCreateManyArgs>(args?: SelectSubset<T, MonthlyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyStats and returns the data saved in the database.
     * @param {MonthlyStatsCreateManyAndReturnArgs} args - Arguments to create many MonthlyStats.
     * @example
     * // Create many MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyStats and only return the `id`
     * const monthlyStatsWithIdOnly = await prisma.monthlyStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyStats.
     * @param {MonthlyStatsDeleteArgs} args - Arguments to delete one MonthlyStats.
     * @example
     * // Delete one MonthlyStats
     * const MonthlyStats = await prisma.monthlyStats.delete({
     *   where: {
     *     // ... filter to delete one MonthlyStats
     *   }
     * })
     * 
     */
    delete<T extends MonthlyStatsDeleteArgs>(args: SelectSubset<T, MonthlyStatsDeleteArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyStats.
     * @param {MonthlyStatsUpdateArgs} args - Arguments to update one MonthlyStats.
     * @example
     * // Update one MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyStatsUpdateArgs>(args: SelectSubset<T, MonthlyStatsUpdateArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyStats.
     * @param {MonthlyStatsDeleteManyArgs} args - Arguments to filter MonthlyStats to delete.
     * @example
     * // Delete a few MonthlyStats
     * const { count } = await prisma.monthlyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyStatsDeleteManyArgs>(args?: SelectSubset<T, MonthlyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyStatsUpdateManyArgs>(args: SelectSubset<T, MonthlyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyStats and returns the data updated in the database.
     * @param {MonthlyStatsUpdateManyAndReturnArgs} args - Arguments to update many MonthlyStats.
     * @example
     * // Update many MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyStats and only return the `id`
     * const monthlyStatsWithIdOnly = await prisma.monthlyStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends MonthlyStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyStats.
     * @param {MonthlyStatsUpsertArgs} args - Arguments to update or create a MonthlyStats.
     * @example
     * // Update or create a MonthlyStats
     * const monthlyStats = await prisma.monthlyStats.upsert({
     *   create: {
     *     // ... data to create a MonthlyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyStats we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyStatsUpsertArgs>(args: SelectSubset<T, MonthlyStatsUpsertArgs<ExtArgs>>): Prisma__MonthlyStatsClient<$Result.GetResult<Prisma.$MonthlyStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsCountArgs} args - Arguments to filter MonthlyStats to count.
     * @example
     * // Count the number of MonthlyStats
     * const count = await prisma.monthlyStats.count({
     *   where: {
     *     // ... the filter for the MonthlyStats we want to count
     *   }
     * })
    **/
    count<T extends MonthlyStatsCountArgs>(
      args?: Subset<T, MonthlyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MonthlyStatsAggregateArgs>(args: Subset<T, MonthlyStatsAggregateArgs>): Prisma.PrismaPromise<GetMonthlyStatsAggregateType<T>>

    /**
     * Group by MonthlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyStatsGroupByArgs} args - Group by arguments.
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
      T extends MonthlyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyStatsGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyStatsGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyStats model
   */
  readonly fields: MonthlyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyStats model
   */
  interface MonthlyStatsFieldRefs {
    readonly id: FieldRef<"MonthlyStats", 'String'>
    readonly userId: FieldRef<"MonthlyStats", 'String'>
    readonly year: FieldRef<"MonthlyStats", 'Int'>
    readonly month: FieldRef<"MonthlyStats", 'Int'>
    readonly completedCount: FieldRef<"MonthlyStats", 'Int'>
    readonly createdCount: FieldRef<"MonthlyStats", 'Int'>
    readonly completionRate: FieldRef<"MonthlyStats", 'Float'>
    readonly createdAt: FieldRef<"MonthlyStats", 'DateTime'>
    readonly updatedAt: FieldRef<"MonthlyStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyStats findUnique
   */
  export type MonthlyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyStats to fetch.
     */
    where: MonthlyStatsWhereUniqueInput
  }

  /**
   * MonthlyStats findUniqueOrThrow
   */
  export type MonthlyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyStats to fetch.
     */
    where: MonthlyStatsWhereUniqueInput
  }

  /**
   * MonthlyStats findFirst
   */
  export type MonthlyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyStats to fetch.
     */
    where?: MonthlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyStats to fetch.
     */
    orderBy?: MonthlyStatsOrderByWithRelationInput | MonthlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyStats.
     */
    cursor?: MonthlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyStats.
     */
    distinct?: MonthlyStatsScalarFieldEnum | MonthlyStatsScalarFieldEnum[]
  }

  /**
   * MonthlyStats findFirstOrThrow
   */
  export type MonthlyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyStats to fetch.
     */
    where?: MonthlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyStats to fetch.
     */
    orderBy?: MonthlyStatsOrderByWithRelationInput | MonthlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyStats.
     */
    cursor?: MonthlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyStats.
     */
    distinct?: MonthlyStatsScalarFieldEnum | MonthlyStatsScalarFieldEnum[]
  }

  /**
   * MonthlyStats findMany
   */
  export type MonthlyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyStats to fetch.
     */
    where?: MonthlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyStats to fetch.
     */
    orderBy?: MonthlyStatsOrderByWithRelationInput | MonthlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyStats.
     */
    cursor?: MonthlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyStats.
     */
    skip?: number
    distinct?: MonthlyStatsScalarFieldEnum | MonthlyStatsScalarFieldEnum[]
  }

  /**
   * MonthlyStats create
   */
  export type MonthlyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyStats.
     */
    data: XOR<MonthlyStatsCreateInput, MonthlyStatsUncheckedCreateInput>
  }

  /**
   * MonthlyStats createMany
   */
  export type MonthlyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyStats.
     */
    data: MonthlyStatsCreateManyInput | MonthlyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyStats createManyAndReturn
   */
  export type MonthlyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyStats.
     */
    data: MonthlyStatsCreateManyInput | MonthlyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyStats update
   */
  export type MonthlyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyStats.
     */
    data: XOR<MonthlyStatsUpdateInput, MonthlyStatsUncheckedUpdateInput>
    /**
     * Choose, which MonthlyStats to update.
     */
    where: MonthlyStatsWhereUniqueInput
  }

  /**
   * MonthlyStats updateMany
   */
  export type MonthlyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyStats.
     */
    data: XOR<MonthlyStatsUpdateManyMutationInput, MonthlyStatsUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyStats to update
     */
    where?: MonthlyStatsWhereInput
    /**
     * Limit how many MonthlyStats to update.
     */
    limit?: number
  }

  /**
   * MonthlyStats updateManyAndReturn
   */
  export type MonthlyStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyStats.
     */
    data: XOR<MonthlyStatsUpdateManyMutationInput, MonthlyStatsUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyStats to update
     */
    where?: MonthlyStatsWhereInput
    /**
     * Limit how many MonthlyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyStats upsert
   */
  export type MonthlyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyStats to update in case it exists.
     */
    where: MonthlyStatsWhereUniqueInput
    /**
     * In case the MonthlyStats found by the `where` argument doesn't exist, create a new MonthlyStats with this data.
     */
    create: XOR<MonthlyStatsCreateInput, MonthlyStatsUncheckedCreateInput>
    /**
     * In case the MonthlyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyStatsUpdateInput, MonthlyStatsUncheckedUpdateInput>
  }

  /**
   * MonthlyStats delete
   */
  export type MonthlyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
    /**
     * Filter which MonthlyStats to delete.
     */
    where: MonthlyStatsWhereUniqueInput
  }

  /**
   * MonthlyStats deleteMany
   */
  export type MonthlyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyStats to delete
     */
    where?: MonthlyStatsWhereInput
    /**
     * Limit how many MonthlyStats to delete.
     */
    limit?: number
  }

  /**
   * MonthlyStats without action
   */
  export type MonthlyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyStats
     */
    select?: MonthlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyStats
     */
    omit?: MonthlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyStatsInclude<ExtArgs> | null
  }


  /**
   * Model YearlyStats
   */

  export type AggregateYearlyStats = {
    _count: YearlyStatsCountAggregateOutputType | null
    _avg: YearlyStatsAvgAggregateOutputType | null
    _sum: YearlyStatsSumAggregateOutputType | null
    _min: YearlyStatsMinAggregateOutputType | null
    _max: YearlyStatsMaxAggregateOutputType | null
  }

  export type YearlyStatsAvgAggregateOutputType = {
    year: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type YearlyStatsSumAggregateOutputType = {
    year: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
  }

  export type YearlyStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YearlyStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    year: number | null
    completedCount: number | null
    createdCount: number | null
    completionRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type YearlyStatsCountAggregateOutputType = {
    id: number
    userId: number
    year: number
    completedCount: number
    createdCount: number
    completionRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type YearlyStatsAvgAggregateInputType = {
    year?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type YearlyStatsSumAggregateInputType = {
    year?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
  }

  export type YearlyStatsMinAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YearlyStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type YearlyStatsCountAggregateInputType = {
    id?: true
    userId?: true
    year?: true
    completedCount?: true
    createdCount?: true
    completionRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type YearlyStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YearlyStats to aggregate.
     */
    where?: YearlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YearlyStats to fetch.
     */
    orderBy?: YearlyStatsOrderByWithRelationInput | YearlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YearlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YearlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YearlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YearlyStats
    **/
    _count?: true | YearlyStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: YearlyStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: YearlyStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YearlyStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YearlyStatsMaxAggregateInputType
  }

  export type GetYearlyStatsAggregateType<T extends YearlyStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateYearlyStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYearlyStats[P]>
      : GetScalarType<T[P], AggregateYearlyStats[P]>
  }




  export type YearlyStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YearlyStatsWhereInput
    orderBy?: YearlyStatsOrderByWithAggregationInput | YearlyStatsOrderByWithAggregationInput[]
    by: YearlyStatsScalarFieldEnum[] | YearlyStatsScalarFieldEnum
    having?: YearlyStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YearlyStatsCountAggregateInputType | true
    _avg?: YearlyStatsAvgAggregateInputType
    _sum?: YearlyStatsSumAggregateInputType
    _min?: YearlyStatsMinAggregateInputType
    _max?: YearlyStatsMaxAggregateInputType
  }

  export type YearlyStatsGroupByOutputType = {
    id: string
    userId: string
    year: number
    completedCount: number
    createdCount: number
    completionRate: number | null
    createdAt: Date
    updatedAt: Date
    _count: YearlyStatsCountAggregateOutputType | null
    _avg: YearlyStatsAvgAggregateOutputType | null
    _sum: YearlyStatsSumAggregateOutputType | null
    _min: YearlyStatsMinAggregateOutputType | null
    _max: YearlyStatsMaxAggregateOutputType | null
  }

  type GetYearlyStatsGroupByPayload<T extends YearlyStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<YearlyStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YearlyStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YearlyStatsGroupByOutputType[P]>
            : GetScalarType<T[P], YearlyStatsGroupByOutputType[P]>
        }
      >
    >


  export type YearlyStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yearlyStats"]>

  export type YearlyStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yearlyStats"]>

  export type YearlyStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    year?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["yearlyStats"]>

  export type YearlyStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    year?: boolean
    completedCount?: boolean
    createdCount?: boolean
    completionRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type YearlyStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "year" | "completedCount" | "createdCount" | "completionRate" | "createdAt" | "updatedAt", ExtArgs["result"]["yearlyStats"]>
  export type YearlyStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type YearlyStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type YearlyStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $YearlyStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "YearlyStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      year: number
      completedCount: number
      createdCount: number
      completionRate: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["yearlyStats"]>
    composites: {}
  }

  type YearlyStatsGetPayload<S extends boolean | null | undefined | YearlyStatsDefaultArgs> = $Result.GetResult<Prisma.$YearlyStatsPayload, S>

  type YearlyStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<YearlyStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: YearlyStatsCountAggregateInputType | true
    }

  export interface YearlyStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['YearlyStats'], meta: { name: 'YearlyStats' } }
    /**
     * Find zero or one YearlyStats that matches the filter.
     * @param {YearlyStatsFindUniqueArgs} args - Arguments to find a YearlyStats
     * @example
     * // Get one YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends YearlyStatsFindUniqueArgs>(args: SelectSubset<T, YearlyStatsFindUniqueArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one YearlyStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {YearlyStatsFindUniqueOrThrowArgs} args - Arguments to find a YearlyStats
     * @example
     * // Get one YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends YearlyStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, YearlyStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YearlyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsFindFirstArgs} args - Arguments to find a YearlyStats
     * @example
     * // Get one YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends YearlyStatsFindFirstArgs>(args?: SelectSubset<T, YearlyStatsFindFirstArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YearlyStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsFindFirstOrThrowArgs} args - Arguments to find a YearlyStats
     * @example
     * // Get one YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends YearlyStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, YearlyStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more YearlyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findMany()
     * 
     * // Get first 10 YearlyStats
     * const yearlyStats = await prisma.yearlyStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const yearlyStatsWithIdOnly = await prisma.yearlyStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends YearlyStatsFindManyArgs>(args?: SelectSubset<T, YearlyStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a YearlyStats.
     * @param {YearlyStatsCreateArgs} args - Arguments to create a YearlyStats.
     * @example
     * // Create one YearlyStats
     * const YearlyStats = await prisma.yearlyStats.create({
     *   data: {
     *     // ... data to create a YearlyStats
     *   }
     * })
     * 
     */
    create<T extends YearlyStatsCreateArgs>(args: SelectSubset<T, YearlyStatsCreateArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many YearlyStats.
     * @param {YearlyStatsCreateManyArgs} args - Arguments to create many YearlyStats.
     * @example
     * // Create many YearlyStats
     * const yearlyStats = await prisma.yearlyStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends YearlyStatsCreateManyArgs>(args?: SelectSubset<T, YearlyStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many YearlyStats and returns the data saved in the database.
     * @param {YearlyStatsCreateManyAndReturnArgs} args - Arguments to create many YearlyStats.
     * @example
     * // Create many YearlyStats
     * const yearlyStats = await prisma.yearlyStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many YearlyStats and only return the `id`
     * const yearlyStatsWithIdOnly = await prisma.yearlyStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends YearlyStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, YearlyStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a YearlyStats.
     * @param {YearlyStatsDeleteArgs} args - Arguments to delete one YearlyStats.
     * @example
     * // Delete one YearlyStats
     * const YearlyStats = await prisma.yearlyStats.delete({
     *   where: {
     *     // ... filter to delete one YearlyStats
     *   }
     * })
     * 
     */
    delete<T extends YearlyStatsDeleteArgs>(args: SelectSubset<T, YearlyStatsDeleteArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one YearlyStats.
     * @param {YearlyStatsUpdateArgs} args - Arguments to update one YearlyStats.
     * @example
     * // Update one YearlyStats
     * const yearlyStats = await prisma.yearlyStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends YearlyStatsUpdateArgs>(args: SelectSubset<T, YearlyStatsUpdateArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more YearlyStats.
     * @param {YearlyStatsDeleteManyArgs} args - Arguments to filter YearlyStats to delete.
     * @example
     * // Delete a few YearlyStats
     * const { count } = await prisma.yearlyStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends YearlyStatsDeleteManyArgs>(args?: SelectSubset<T, YearlyStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YearlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YearlyStats
     * const yearlyStats = await prisma.yearlyStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends YearlyStatsUpdateManyArgs>(args: SelectSubset<T, YearlyStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YearlyStats and returns the data updated in the database.
     * @param {YearlyStatsUpdateManyAndReturnArgs} args - Arguments to update many YearlyStats.
     * @example
     * // Update many YearlyStats
     * const yearlyStats = await prisma.yearlyStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more YearlyStats and only return the `id`
     * const yearlyStatsWithIdOnly = await prisma.yearlyStats.updateManyAndReturn({
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
    updateManyAndReturn<T extends YearlyStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, YearlyStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one YearlyStats.
     * @param {YearlyStatsUpsertArgs} args - Arguments to update or create a YearlyStats.
     * @example
     * // Update or create a YearlyStats
     * const yearlyStats = await prisma.yearlyStats.upsert({
     *   create: {
     *     // ... data to create a YearlyStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YearlyStats we want to update
     *   }
     * })
     */
    upsert<T extends YearlyStatsUpsertArgs>(args: SelectSubset<T, YearlyStatsUpsertArgs<ExtArgs>>): Prisma__YearlyStatsClient<$Result.GetResult<Prisma.$YearlyStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of YearlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsCountArgs} args - Arguments to filter YearlyStats to count.
     * @example
     * // Count the number of YearlyStats
     * const count = await prisma.yearlyStats.count({
     *   where: {
     *     // ... the filter for the YearlyStats we want to count
     *   }
     * })
    **/
    count<T extends YearlyStatsCountArgs>(
      args?: Subset<T, YearlyStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YearlyStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YearlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends YearlyStatsAggregateArgs>(args: Subset<T, YearlyStatsAggregateArgs>): Prisma.PrismaPromise<GetYearlyStatsAggregateType<T>>

    /**
     * Group by YearlyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YearlyStatsGroupByArgs} args - Group by arguments.
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
      T extends YearlyStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YearlyStatsGroupByArgs['orderBy'] }
        : { orderBy?: YearlyStatsGroupByArgs['orderBy'] },
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
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, YearlyStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYearlyStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the YearlyStats model
   */
  readonly fields: YearlyStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for YearlyStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__YearlyStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the YearlyStats model
   */
  interface YearlyStatsFieldRefs {
    readonly id: FieldRef<"YearlyStats", 'String'>
    readonly userId: FieldRef<"YearlyStats", 'String'>
    readonly year: FieldRef<"YearlyStats", 'Int'>
    readonly completedCount: FieldRef<"YearlyStats", 'Int'>
    readonly createdCount: FieldRef<"YearlyStats", 'Int'>
    readonly completionRate: FieldRef<"YearlyStats", 'Float'>
    readonly createdAt: FieldRef<"YearlyStats", 'DateTime'>
    readonly updatedAt: FieldRef<"YearlyStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * YearlyStats findUnique
   */
  export type YearlyStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which YearlyStats to fetch.
     */
    where: YearlyStatsWhereUniqueInput
  }

  /**
   * YearlyStats findUniqueOrThrow
   */
  export type YearlyStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which YearlyStats to fetch.
     */
    where: YearlyStatsWhereUniqueInput
  }

  /**
   * YearlyStats findFirst
   */
  export type YearlyStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which YearlyStats to fetch.
     */
    where?: YearlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YearlyStats to fetch.
     */
    orderBy?: YearlyStatsOrderByWithRelationInput | YearlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YearlyStats.
     */
    cursor?: YearlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YearlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YearlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YearlyStats.
     */
    distinct?: YearlyStatsScalarFieldEnum | YearlyStatsScalarFieldEnum[]
  }

  /**
   * YearlyStats findFirstOrThrow
   */
  export type YearlyStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which YearlyStats to fetch.
     */
    where?: YearlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YearlyStats to fetch.
     */
    orderBy?: YearlyStatsOrderByWithRelationInput | YearlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YearlyStats.
     */
    cursor?: YearlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YearlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YearlyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YearlyStats.
     */
    distinct?: YearlyStatsScalarFieldEnum | YearlyStatsScalarFieldEnum[]
  }

  /**
   * YearlyStats findMany
   */
  export type YearlyStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter, which YearlyStats to fetch.
     */
    where?: YearlyStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YearlyStats to fetch.
     */
    orderBy?: YearlyStatsOrderByWithRelationInput | YearlyStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YearlyStats.
     */
    cursor?: YearlyStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YearlyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YearlyStats.
     */
    skip?: number
    distinct?: YearlyStatsScalarFieldEnum | YearlyStatsScalarFieldEnum[]
  }

  /**
   * YearlyStats create
   */
  export type YearlyStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a YearlyStats.
     */
    data: XOR<YearlyStatsCreateInput, YearlyStatsUncheckedCreateInput>
  }

  /**
   * YearlyStats createMany
   */
  export type YearlyStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many YearlyStats.
     */
    data: YearlyStatsCreateManyInput | YearlyStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YearlyStats createManyAndReturn
   */
  export type YearlyStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * The data used to create many YearlyStats.
     */
    data: YearlyStatsCreateManyInput | YearlyStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * YearlyStats update
   */
  export type YearlyStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a YearlyStats.
     */
    data: XOR<YearlyStatsUpdateInput, YearlyStatsUncheckedUpdateInput>
    /**
     * Choose, which YearlyStats to update.
     */
    where: YearlyStatsWhereUniqueInput
  }

  /**
   * YearlyStats updateMany
   */
  export type YearlyStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update YearlyStats.
     */
    data: XOR<YearlyStatsUpdateManyMutationInput, YearlyStatsUncheckedUpdateManyInput>
    /**
     * Filter which YearlyStats to update
     */
    where?: YearlyStatsWhereInput
    /**
     * Limit how many YearlyStats to update.
     */
    limit?: number
  }

  /**
   * YearlyStats updateManyAndReturn
   */
  export type YearlyStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * The data used to update YearlyStats.
     */
    data: XOR<YearlyStatsUpdateManyMutationInput, YearlyStatsUncheckedUpdateManyInput>
    /**
     * Filter which YearlyStats to update
     */
    where?: YearlyStatsWhereInput
    /**
     * Limit how many YearlyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * YearlyStats upsert
   */
  export type YearlyStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the YearlyStats to update in case it exists.
     */
    where: YearlyStatsWhereUniqueInput
    /**
     * In case the YearlyStats found by the `where` argument doesn't exist, create a new YearlyStats with this data.
     */
    create: XOR<YearlyStatsCreateInput, YearlyStatsUncheckedCreateInput>
    /**
     * In case the YearlyStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YearlyStatsUpdateInput, YearlyStatsUncheckedUpdateInput>
  }

  /**
   * YearlyStats delete
   */
  export type YearlyStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
    /**
     * Filter which YearlyStats to delete.
     */
    where: YearlyStatsWhereUniqueInput
  }

  /**
   * YearlyStats deleteMany
   */
  export type YearlyStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YearlyStats to delete
     */
    where?: YearlyStatsWhereInput
    /**
     * Limit how many YearlyStats to delete.
     */
    limit?: number
  }

  /**
   * YearlyStats without action
   */
  export type YearlyStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YearlyStats
     */
    select?: YearlyStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YearlyStats
     */
    omit?: YearlyStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YearlyStatsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    googleId: 'googleId',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    subscriptionPlan: 'subscriptionPlan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TaskCustomDataScalarFieldEnum: {
    id: 'id',
    googleTaskId: 'googleTaskId',
    userId: 'userId',
    priorityId: 'priorityId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskCustomDataScalarFieldEnum = (typeof TaskCustomDataScalarFieldEnum)[keyof typeof TaskCustomDataScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const PriorityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    level: 'level'
  };

  export type PriorityScalarFieldEnum = (typeof PriorityScalarFieldEnum)[keyof typeof PriorityScalarFieldEnum]


  export const DailyStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    completedCount: 'completedCount',
    createdCount: 'createdCount',
    completionRate: 'completionRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyStatsScalarFieldEnum = (typeof DailyStatsScalarFieldEnum)[keyof typeof DailyStatsScalarFieldEnum]


  export const WeeklyStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    weekOfYear: 'weekOfYear',
    completedCount: 'completedCount',
    createdCount: 'createdCount',
    completionRate: 'completionRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeeklyStatsScalarFieldEnum = (typeof WeeklyStatsScalarFieldEnum)[keyof typeof WeeklyStatsScalarFieldEnum]


  export const MonthlyStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    month: 'month',
    completedCount: 'completedCount',
    createdCount: 'createdCount',
    completionRate: 'completionRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MonthlyStatsScalarFieldEnum = (typeof MonthlyStatsScalarFieldEnum)[keyof typeof MonthlyStatsScalarFieldEnum]


  export const YearlyStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    year: 'year',
    completedCount: 'completedCount',
    createdCount: 'createdCount',
    completionRate: 'completionRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type YearlyStatsScalarFieldEnum = (typeof YearlyStatsScalarFieldEnum)[keyof typeof YearlyStatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    googleId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    subscriptionPlan?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customTasks?: TaskCustomDataListRelationFilter
    tags?: TagListRelationFilter
    dailyStats?: DailyStatsListRelationFilter
    weeklyStats?: WeeklyStatsListRelationFilter
    monthlyStats?: MonthlyStatsListRelationFilter
    yearlyStats?: YearlyStatsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customTasks?: TaskCustomDataOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
    dailyStats?: DailyStatsOrderByRelationAggregateInput
    weeklyStats?: WeeklyStatsOrderByRelationAggregateInput
    monthlyStats?: MonthlyStatsOrderByRelationAggregateInput
    yearlyStats?: YearlyStatsOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    subscriptionPlan?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customTasks?: TaskCustomDataListRelationFilter
    tags?: TagListRelationFilter
    dailyStats?: DailyStatsListRelationFilter
    weeklyStats?: WeeklyStatsListRelationFilter
    monthlyStats?: MonthlyStatsListRelationFilter
    yearlyStats?: YearlyStatsListRelationFilter
  }, "id" | "googleId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    googleId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionPlan?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TaskCustomDataWhereInput = {
    AND?: TaskCustomDataWhereInput | TaskCustomDataWhereInput[]
    OR?: TaskCustomDataWhereInput[]
    NOT?: TaskCustomDataWhereInput | TaskCustomDataWhereInput[]
    id?: StringFilter<"TaskCustomData"> | string
    googleTaskId?: StringFilter<"TaskCustomData"> | string
    userId?: StringFilter<"TaskCustomData"> | string
    priorityId?: IntNullableFilter<"TaskCustomData"> | number | null
    createdAt?: DateTimeFilter<"TaskCustomData"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCustomData"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
    tags?: TagListRelationFilter
  }

  export type TaskCustomDataOrderByWithRelationInput = {
    id?: SortOrder
    googleTaskId?: SortOrder
    userId?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    priority?: PriorityOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type TaskCustomDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    googleTaskId?: string
    AND?: TaskCustomDataWhereInput | TaskCustomDataWhereInput[]
    OR?: TaskCustomDataWhereInput[]
    NOT?: TaskCustomDataWhereInput | TaskCustomDataWhereInput[]
    userId?: StringFilter<"TaskCustomData"> | string
    priorityId?: IntNullableFilter<"TaskCustomData"> | number | null
    createdAt?: DateTimeFilter<"TaskCustomData"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCustomData"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    priority?: XOR<PriorityNullableScalarRelationFilter, PriorityWhereInput> | null
    tags?: TagListRelationFilter
  }, "id" | "googleTaskId">

  export type TaskCustomDataOrderByWithAggregationInput = {
    id?: SortOrder
    googleTaskId?: SortOrder
    userId?: SortOrder
    priorityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCustomDataCountOrderByAggregateInput
    _avg?: TaskCustomDataAvgOrderByAggregateInput
    _max?: TaskCustomDataMaxOrderByAggregateInput
    _min?: TaskCustomDataMinOrderByAggregateInput
    _sum?: TaskCustomDataSumOrderByAggregateInput
  }

  export type TaskCustomDataScalarWhereWithAggregatesInput = {
    AND?: TaskCustomDataScalarWhereWithAggregatesInput | TaskCustomDataScalarWhereWithAggregatesInput[]
    OR?: TaskCustomDataScalarWhereWithAggregatesInput[]
    NOT?: TaskCustomDataScalarWhereWithAggregatesInput | TaskCustomDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskCustomData"> | string
    googleTaskId?: StringWithAggregatesFilter<"TaskCustomData"> | string
    userId?: StringWithAggregatesFilter<"TaskCustomData"> | string
    priorityId?: IntNullableWithAggregatesFilter<"TaskCustomData"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TaskCustomData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskCustomData"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    userId?: StringFilter<"Tag"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customTasks?: TaskCustomDataListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    customTasks?: TaskCustomDataOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_userId?: TagNameUserIdCompoundUniqueInput
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    name?: StringFilter<"Tag"> | string
    userId?: StringFilter<"Tag"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    customTasks?: TaskCustomDataListRelationFilter
  }, "id" | "name_userId">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    userId?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type PriorityWhereInput = {
    AND?: PriorityWhereInput | PriorityWhereInput[]
    OR?: PriorityWhereInput[]
    NOT?: PriorityWhereInput | PriorityWhereInput[]
    id?: IntFilter<"Priority"> | number
    name?: StringFilter<"Priority"> | string
    level?: IntFilter<"Priority"> | number
    customTasks?: TaskCustomDataListRelationFilter
  }

  export type PriorityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    customTasks?: TaskCustomDataOrderByRelationAggregateInput
  }

  export type PriorityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    level?: number
    AND?: PriorityWhereInput | PriorityWhereInput[]
    OR?: PriorityWhereInput[]
    NOT?: PriorityWhereInput | PriorityWhereInput[]
    customTasks?: TaskCustomDataListRelationFilter
  }, "id" | "name" | "level">

  export type PriorityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    _count?: PriorityCountOrderByAggregateInput
    _avg?: PriorityAvgOrderByAggregateInput
    _max?: PriorityMaxOrderByAggregateInput
    _min?: PriorityMinOrderByAggregateInput
    _sum?: PrioritySumOrderByAggregateInput
  }

  export type PriorityScalarWhereWithAggregatesInput = {
    AND?: PriorityScalarWhereWithAggregatesInput | PriorityScalarWhereWithAggregatesInput[]
    OR?: PriorityScalarWhereWithAggregatesInput[]
    NOT?: PriorityScalarWhereWithAggregatesInput | PriorityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Priority"> | number
    name?: StringWithAggregatesFilter<"Priority"> | string
    level?: IntWithAggregatesFilter<"Priority"> | number
  }

  export type DailyStatsWhereInput = {
    AND?: DailyStatsWhereInput | DailyStatsWhereInput[]
    OR?: DailyStatsWhereInput[]
    NOT?: DailyStatsWhereInput | DailyStatsWhereInput[]
    id?: StringFilter<"DailyStats"> | string
    userId?: StringFilter<"DailyStats"> | string
    date?: DateTimeFilter<"DailyStats"> | Date | string
    completedCount?: IntFilter<"DailyStats"> | number
    createdCount?: IntFilter<"DailyStats"> | number
    completionRate?: FloatNullableFilter<"DailyStats"> | number | null
    createdAt?: DateTimeFilter<"DailyStats"> | Date | string
    updatedAt?: DateTimeFilter<"DailyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DailyStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DailyStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: DailyStatsUserIdDateCompoundUniqueInput
    AND?: DailyStatsWhereInput | DailyStatsWhereInput[]
    OR?: DailyStatsWhereInput[]
    NOT?: DailyStatsWhereInput | DailyStatsWhereInput[]
    userId?: StringFilter<"DailyStats"> | string
    date?: DateTimeFilter<"DailyStats"> | Date | string
    completedCount?: IntFilter<"DailyStats"> | number
    createdCount?: IntFilter<"DailyStats"> | number
    completionRate?: FloatNullableFilter<"DailyStats"> | number | null
    createdAt?: DateTimeFilter<"DailyStats"> | Date | string
    updatedAt?: DateTimeFilter<"DailyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type DailyStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyStatsCountOrderByAggregateInput
    _avg?: DailyStatsAvgOrderByAggregateInput
    _max?: DailyStatsMaxOrderByAggregateInput
    _min?: DailyStatsMinOrderByAggregateInput
    _sum?: DailyStatsSumOrderByAggregateInput
  }

  export type DailyStatsScalarWhereWithAggregatesInput = {
    AND?: DailyStatsScalarWhereWithAggregatesInput | DailyStatsScalarWhereWithAggregatesInput[]
    OR?: DailyStatsScalarWhereWithAggregatesInput[]
    NOT?: DailyStatsScalarWhereWithAggregatesInput | DailyStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyStats"> | string
    userId?: StringWithAggregatesFilter<"DailyStats"> | string
    date?: DateTimeWithAggregatesFilter<"DailyStats"> | Date | string
    completedCount?: IntWithAggregatesFilter<"DailyStats"> | number
    createdCount?: IntWithAggregatesFilter<"DailyStats"> | number
    completionRate?: FloatNullableWithAggregatesFilter<"DailyStats"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"DailyStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyStats"> | Date | string
  }

  export type WeeklyStatsWhereInput = {
    AND?: WeeklyStatsWhereInput | WeeklyStatsWhereInput[]
    OR?: WeeklyStatsWhereInput[]
    NOT?: WeeklyStatsWhereInput | WeeklyStatsWhereInput[]
    id?: StringFilter<"WeeklyStats"> | string
    userId?: StringFilter<"WeeklyStats"> | string
    year?: IntFilter<"WeeklyStats"> | number
    weekOfYear?: IntFilter<"WeeklyStats"> | number
    completedCount?: IntFilter<"WeeklyStats"> | number
    createdCount?: IntFilter<"WeeklyStats"> | number
    completionRate?: FloatNullableFilter<"WeeklyStats"> | number | null
    createdAt?: DateTimeFilter<"WeeklyStats"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WeeklyStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WeeklyStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_weekOfYear?: WeeklyStatsUserIdYearWeekOfYearCompoundUniqueInput
    AND?: WeeklyStatsWhereInput | WeeklyStatsWhereInput[]
    OR?: WeeklyStatsWhereInput[]
    NOT?: WeeklyStatsWhereInput | WeeklyStatsWhereInput[]
    userId?: StringFilter<"WeeklyStats"> | string
    year?: IntFilter<"WeeklyStats"> | number
    weekOfYear?: IntFilter<"WeeklyStats"> | number
    completedCount?: IntFilter<"WeeklyStats"> | number
    createdCount?: IntFilter<"WeeklyStats"> | number
    completionRate?: FloatNullableFilter<"WeeklyStats"> | number | null
    createdAt?: DateTimeFilter<"WeeklyStats"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year_weekOfYear">

  export type WeeklyStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeeklyStatsCountOrderByAggregateInput
    _avg?: WeeklyStatsAvgOrderByAggregateInput
    _max?: WeeklyStatsMaxOrderByAggregateInput
    _min?: WeeklyStatsMinOrderByAggregateInput
    _sum?: WeeklyStatsSumOrderByAggregateInput
  }

  export type WeeklyStatsScalarWhereWithAggregatesInput = {
    AND?: WeeklyStatsScalarWhereWithAggregatesInput | WeeklyStatsScalarWhereWithAggregatesInput[]
    OR?: WeeklyStatsScalarWhereWithAggregatesInput[]
    NOT?: WeeklyStatsScalarWhereWithAggregatesInput | WeeklyStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeeklyStats"> | string
    userId?: StringWithAggregatesFilter<"WeeklyStats"> | string
    year?: IntWithAggregatesFilter<"WeeklyStats"> | number
    weekOfYear?: IntWithAggregatesFilter<"WeeklyStats"> | number
    completedCount?: IntWithAggregatesFilter<"WeeklyStats"> | number
    createdCount?: IntWithAggregatesFilter<"WeeklyStats"> | number
    completionRate?: FloatNullableWithAggregatesFilter<"WeeklyStats"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"WeeklyStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeeklyStats"> | Date | string
  }

  export type MonthlyStatsWhereInput = {
    AND?: MonthlyStatsWhereInput | MonthlyStatsWhereInput[]
    OR?: MonthlyStatsWhereInput[]
    NOT?: MonthlyStatsWhereInput | MonthlyStatsWhereInput[]
    id?: StringFilter<"MonthlyStats"> | string
    userId?: StringFilter<"MonthlyStats"> | string
    year?: IntFilter<"MonthlyStats"> | number
    month?: IntFilter<"MonthlyStats"> | number
    completedCount?: IntFilter<"MonthlyStats"> | number
    createdCount?: IntFilter<"MonthlyStats"> | number
    completionRate?: FloatNullableFilter<"MonthlyStats"> | number | null
    createdAt?: DateTimeFilter<"MonthlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MonthlyStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MonthlyStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year_month?: MonthlyStatsUserIdYearMonthCompoundUniqueInput
    AND?: MonthlyStatsWhereInput | MonthlyStatsWhereInput[]
    OR?: MonthlyStatsWhereInput[]
    NOT?: MonthlyStatsWhereInput | MonthlyStatsWhereInput[]
    userId?: StringFilter<"MonthlyStats"> | string
    year?: IntFilter<"MonthlyStats"> | number
    month?: IntFilter<"MonthlyStats"> | number
    completedCount?: IntFilter<"MonthlyStats"> | number
    createdCount?: IntFilter<"MonthlyStats"> | number
    completionRate?: FloatNullableFilter<"MonthlyStats"> | number | null
    createdAt?: DateTimeFilter<"MonthlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year_month">

  export type MonthlyStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MonthlyStatsCountOrderByAggregateInput
    _avg?: MonthlyStatsAvgOrderByAggregateInput
    _max?: MonthlyStatsMaxOrderByAggregateInput
    _min?: MonthlyStatsMinOrderByAggregateInput
    _sum?: MonthlyStatsSumOrderByAggregateInput
  }

  export type MonthlyStatsScalarWhereWithAggregatesInput = {
    AND?: MonthlyStatsScalarWhereWithAggregatesInput | MonthlyStatsScalarWhereWithAggregatesInput[]
    OR?: MonthlyStatsScalarWhereWithAggregatesInput[]
    NOT?: MonthlyStatsScalarWhereWithAggregatesInput | MonthlyStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyStats"> | string
    userId?: StringWithAggregatesFilter<"MonthlyStats"> | string
    year?: IntWithAggregatesFilter<"MonthlyStats"> | number
    month?: IntWithAggregatesFilter<"MonthlyStats"> | number
    completedCount?: IntWithAggregatesFilter<"MonthlyStats"> | number
    createdCount?: IntWithAggregatesFilter<"MonthlyStats"> | number
    completionRate?: FloatNullableWithAggregatesFilter<"MonthlyStats"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MonthlyStats"> | Date | string
  }

  export type YearlyStatsWhereInput = {
    AND?: YearlyStatsWhereInput | YearlyStatsWhereInput[]
    OR?: YearlyStatsWhereInput[]
    NOT?: YearlyStatsWhereInput | YearlyStatsWhereInput[]
    id?: StringFilter<"YearlyStats"> | string
    userId?: StringFilter<"YearlyStats"> | string
    year?: IntFilter<"YearlyStats"> | number
    completedCount?: IntFilter<"YearlyStats"> | number
    createdCount?: IntFilter<"YearlyStats"> | number
    completionRate?: FloatNullableFilter<"YearlyStats"> | number | null
    createdAt?: DateTimeFilter<"YearlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"YearlyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type YearlyStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type YearlyStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_year?: YearlyStatsUserIdYearCompoundUniqueInput
    AND?: YearlyStatsWhereInput | YearlyStatsWhereInput[]
    OR?: YearlyStatsWhereInput[]
    NOT?: YearlyStatsWhereInput | YearlyStatsWhereInput[]
    userId?: StringFilter<"YearlyStats"> | string
    year?: IntFilter<"YearlyStats"> | number
    completedCount?: IntFilter<"YearlyStats"> | number
    createdCount?: IntFilter<"YearlyStats"> | number
    completionRate?: FloatNullableFilter<"YearlyStats"> | number | null
    createdAt?: DateTimeFilter<"YearlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"YearlyStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_year">

  export type YearlyStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: YearlyStatsCountOrderByAggregateInput
    _avg?: YearlyStatsAvgOrderByAggregateInput
    _max?: YearlyStatsMaxOrderByAggregateInput
    _min?: YearlyStatsMinOrderByAggregateInput
    _sum?: YearlyStatsSumOrderByAggregateInput
  }

  export type YearlyStatsScalarWhereWithAggregatesInput = {
    AND?: YearlyStatsScalarWhereWithAggregatesInput | YearlyStatsScalarWhereWithAggregatesInput[]
    OR?: YearlyStatsScalarWhereWithAggregatesInput[]
    NOT?: YearlyStatsScalarWhereWithAggregatesInput | YearlyStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"YearlyStats"> | string
    userId?: StringWithAggregatesFilter<"YearlyStats"> | string
    year?: IntWithAggregatesFilter<"YearlyStats"> | number
    completedCount?: IntWithAggregatesFilter<"YearlyStats"> | number
    createdCount?: IntWithAggregatesFilter<"YearlyStats"> | number
    completionRate?: FloatNullableWithAggregatesFilter<"YearlyStats"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"YearlyStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"YearlyStats"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCustomDataCreateInput = {
    id?: string
    googleTaskId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomTasksInput
    priority?: PriorityCreateNestedOneWithoutCustomTasksInput
    tags?: TagCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataUncheckedCreateInput = {
    id?: string
    googleTaskId: string
    userId: string
    priorityId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomTasksNestedInput
    priority?: PriorityUpdateOneWithoutCustomTasksNestedInput
    tags?: TagUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataCreateManyInput = {
    id?: string
    googleTaskId: string
    userId: string
    priorityId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCustomDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCustomDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    user: UserCreateNestedOneWithoutTagsInput
    customTasks?: TaskCustomDataCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTagsNestedInput
    customTasks?: TaskCustomDataUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    userId: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PriorityCreateInput = {
    name: string
    level: number
    customTasks?: TaskCustomDataCreateNestedManyWithoutPriorityInput
  }

  export type PriorityUncheckedCreateInput = {
    id?: number
    name: string
    level: number
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutPriorityInput
  }

  export type PriorityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    customTasks?: TaskCustomDataUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutPriorityNestedInput
  }

  export type PriorityCreateManyInput = {
    id?: number
    name: string
    level: number
  }

  export type PriorityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
  }

  export type PriorityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
  }

  export type DailyStatsCreateInput = {
    id?: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDailyStatsInput
  }

  export type DailyStatsUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDailyStatsNestedInput
  }

  export type DailyStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatsCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsCreateInput = {
    id?: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWeeklyStatsInput
  }

  export type WeeklyStatsUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWeeklyStatsNestedInput
  }

  export type WeeklyStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsCreateManyInput = {
    id?: string
    userId: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsCreateInput = {
    id?: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMonthlyStatsInput
  }

  export type MonthlyStatsUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMonthlyStatsNestedInput
  }

  export type MonthlyStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsCreateManyInput = {
    id?: string
    userId: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsCreateInput = {
    id?: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutYearlyStatsInput
  }

  export type YearlyStatsUncheckedCreateInput = {
    id?: string
    userId: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YearlyStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutYearlyStatsNestedInput
  }

  export type YearlyStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsCreateManyInput = {
    id?: string
    userId: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YearlyStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TaskCustomDataListRelationFilter = {
    every?: TaskCustomDataWhereInput
    some?: TaskCustomDataWhereInput
    none?: TaskCustomDataWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type DailyStatsListRelationFilter = {
    every?: DailyStatsWhereInput
    some?: DailyStatsWhereInput
    none?: DailyStatsWhereInput
  }

  export type WeeklyStatsListRelationFilter = {
    every?: WeeklyStatsWhereInput
    some?: WeeklyStatsWhereInput
    none?: WeeklyStatsWhereInput
  }

  export type MonthlyStatsListRelationFilter = {
    every?: MonthlyStatsWhereInput
    some?: MonthlyStatsWhereInput
    none?: MonthlyStatsWhereInput
  }

  export type YearlyStatsListRelationFilter = {
    every?: YearlyStatsWhereInput
    some?: YearlyStatsWhereInput
    none?: YearlyStatsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskCustomDataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeeklyStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type YearlyStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    subscriptionPlan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    subscriptionPlan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    googleId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    subscriptionPlan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PriorityNullableScalarRelationFilter = {
    is?: PriorityWhereInput | null
    isNot?: PriorityWhereInput | null
  }

  export type TaskCustomDataCountOrderByAggregateInput = {
    id?: SortOrder
    googleTaskId?: SortOrder
    userId?: SortOrder
    priorityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCustomDataAvgOrderByAggregateInput = {
    priorityId?: SortOrder
  }

  export type TaskCustomDataMaxOrderByAggregateInput = {
    id?: SortOrder
    googleTaskId?: SortOrder
    userId?: SortOrder
    priorityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCustomDataMinOrderByAggregateInput = {
    id?: SortOrder
    googleTaskId?: SortOrder
    userId?: SortOrder
    priorityId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCustomDataSumOrderByAggregateInput = {
    priorityId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TagNameUserIdCompoundUniqueInput = {
    name: string
    userId: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PriorityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
  }

  export type PriorityAvgOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type PriorityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
  }

  export type PriorityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
  }

  export type PrioritySumOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DailyStatsUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type DailyStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatsAvgOrderByAggregateInput = {
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type DailyStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyStatsSumOrderByAggregateInput = {
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type WeeklyStatsUserIdYearWeekOfYearCompoundUniqueInput = {
    userId: string
    year: number
    weekOfYear: number
  }

  export type WeeklyStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyStatsAvgOrderByAggregateInput = {
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type WeeklyStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeeklyStatsSumOrderByAggregateInput = {
    year?: SortOrder
    weekOfYear?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type MonthlyStatsUserIdYearMonthCompoundUniqueInput = {
    userId: string
    year: number
    month: number
  }

  export type MonthlyStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyStatsAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type MonthlyStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyStatsSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type YearlyStatsUserIdYearCompoundUniqueInput = {
    userId: string
    year: number
  }

  export type YearlyStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YearlyStatsAvgOrderByAggregateInput = {
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type YearlyStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YearlyStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type YearlyStatsSumOrderByAggregateInput = {
    year?: SortOrder
    completedCount?: SortOrder
    createdCount?: SortOrder
    completionRate?: SortOrder
  }

  export type TaskCustomDataCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput> | TaskCustomDataCreateWithoutUserInput[] | TaskCustomDataUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutUserInput | TaskCustomDataCreateOrConnectWithoutUserInput[]
    createMany?: TaskCustomDataCreateManyUserInputEnvelope
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutUserInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type DailyStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput> | DailyStatsCreateWithoutUserInput[] | DailyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyStatsCreateOrConnectWithoutUserInput | DailyStatsCreateOrConnectWithoutUserInput[]
    createMany?: DailyStatsCreateManyUserInputEnvelope
    connect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
  }

  export type WeeklyStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput> | WeeklyStatsCreateWithoutUserInput[] | WeeklyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyStatsCreateOrConnectWithoutUserInput | WeeklyStatsCreateOrConnectWithoutUserInput[]
    createMany?: WeeklyStatsCreateManyUserInputEnvelope
    connect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
  }

  export type MonthlyStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput> | MonthlyStatsCreateWithoutUserInput[] | MonthlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyStatsCreateOrConnectWithoutUserInput | MonthlyStatsCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyStatsCreateManyUserInputEnvelope
    connect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
  }

  export type YearlyStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput> | YearlyStatsCreateWithoutUserInput[] | YearlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: YearlyStatsCreateOrConnectWithoutUserInput | YearlyStatsCreateOrConnectWithoutUserInput[]
    createMany?: YearlyStatsCreateManyUserInputEnvelope
    connect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
  }

  export type TaskCustomDataUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput> | TaskCustomDataCreateWithoutUserInput[] | TaskCustomDataUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutUserInput | TaskCustomDataCreateOrConnectWithoutUserInput[]
    createMany?: TaskCustomDataCreateManyUserInputEnvelope
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type DailyStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput> | DailyStatsCreateWithoutUserInput[] | DailyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyStatsCreateOrConnectWithoutUserInput | DailyStatsCreateOrConnectWithoutUserInput[]
    createMany?: DailyStatsCreateManyUserInputEnvelope
    connect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
  }

  export type WeeklyStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput> | WeeklyStatsCreateWithoutUserInput[] | WeeklyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyStatsCreateOrConnectWithoutUserInput | WeeklyStatsCreateOrConnectWithoutUserInput[]
    createMany?: WeeklyStatsCreateManyUserInputEnvelope
    connect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
  }

  export type MonthlyStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput> | MonthlyStatsCreateWithoutUserInput[] | MonthlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyStatsCreateOrConnectWithoutUserInput | MonthlyStatsCreateOrConnectWithoutUserInput[]
    createMany?: MonthlyStatsCreateManyUserInputEnvelope
    connect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
  }

  export type YearlyStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput> | YearlyStatsCreateWithoutUserInput[] | YearlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: YearlyStatsCreateOrConnectWithoutUserInput | YearlyStatsCreateOrConnectWithoutUserInput[]
    createMany?: YearlyStatsCreateManyUserInputEnvelope
    connect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TaskCustomDataUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput> | TaskCustomDataCreateWithoutUserInput[] | TaskCustomDataUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutUserInput | TaskCustomDataCreateOrConnectWithoutUserInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutUserInput | TaskCustomDataUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCustomDataCreateManyUserInputEnvelope
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutUserInput | TaskCustomDataUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutUserInput | TaskCustomDataUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type TagUpdateManyWithoutUserNestedInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutUserInput | TagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutUserInput | TagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TagUpdateManyWithWhereWithoutUserInput | TagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type DailyStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput> | DailyStatsCreateWithoutUserInput[] | DailyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyStatsCreateOrConnectWithoutUserInput | DailyStatsCreateOrConnectWithoutUserInput[]
    upsert?: DailyStatsUpsertWithWhereUniqueWithoutUserInput | DailyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyStatsCreateManyUserInputEnvelope
    set?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    disconnect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    delete?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    connect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    update?: DailyStatsUpdateWithWhereUniqueWithoutUserInput | DailyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyStatsUpdateManyWithWhereWithoutUserInput | DailyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyStatsScalarWhereInput | DailyStatsScalarWhereInput[]
  }

  export type WeeklyStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput> | WeeklyStatsCreateWithoutUserInput[] | WeeklyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyStatsCreateOrConnectWithoutUserInput | WeeklyStatsCreateOrConnectWithoutUserInput[]
    upsert?: WeeklyStatsUpsertWithWhereUniqueWithoutUserInput | WeeklyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeeklyStatsCreateManyUserInputEnvelope
    set?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    disconnect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    delete?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    connect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    update?: WeeklyStatsUpdateWithWhereUniqueWithoutUserInput | WeeklyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeeklyStatsUpdateManyWithWhereWithoutUserInput | WeeklyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeeklyStatsScalarWhereInput | WeeklyStatsScalarWhereInput[]
  }

  export type MonthlyStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput> | MonthlyStatsCreateWithoutUserInput[] | MonthlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyStatsCreateOrConnectWithoutUserInput | MonthlyStatsCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyStatsUpsertWithWhereUniqueWithoutUserInput | MonthlyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyStatsCreateManyUserInputEnvelope
    set?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    disconnect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    delete?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    connect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    update?: MonthlyStatsUpdateWithWhereUniqueWithoutUserInput | MonthlyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyStatsUpdateManyWithWhereWithoutUserInput | MonthlyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyStatsScalarWhereInput | MonthlyStatsScalarWhereInput[]
  }

  export type YearlyStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput> | YearlyStatsCreateWithoutUserInput[] | YearlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: YearlyStatsCreateOrConnectWithoutUserInput | YearlyStatsCreateOrConnectWithoutUserInput[]
    upsert?: YearlyStatsUpsertWithWhereUniqueWithoutUserInput | YearlyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: YearlyStatsCreateManyUserInputEnvelope
    set?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    disconnect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    delete?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    connect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    update?: YearlyStatsUpdateWithWhereUniqueWithoutUserInput | YearlyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: YearlyStatsUpdateManyWithWhereWithoutUserInput | YearlyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: YearlyStatsScalarWhereInput | YearlyStatsScalarWhereInput[]
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput> | TaskCustomDataCreateWithoutUserInput[] | TaskCustomDataUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutUserInput | TaskCustomDataCreateOrConnectWithoutUserInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutUserInput | TaskCustomDataUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCustomDataCreateManyUserInputEnvelope
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutUserInput | TaskCustomDataUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutUserInput | TaskCustomDataUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput> | TagCreateWithoutUserInput[] | TagUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TagCreateOrConnectWithoutUserInput | TagCreateOrConnectWithoutUserInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutUserInput | TagUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TagCreateManyUserInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutUserInput | TagUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TagUpdateManyWithWhereWithoutUserInput | TagUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type DailyStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput> | DailyStatsCreateWithoutUserInput[] | DailyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyStatsCreateOrConnectWithoutUserInput | DailyStatsCreateOrConnectWithoutUserInput[]
    upsert?: DailyStatsUpsertWithWhereUniqueWithoutUserInput | DailyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyStatsCreateManyUserInputEnvelope
    set?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    disconnect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    delete?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    connect?: DailyStatsWhereUniqueInput | DailyStatsWhereUniqueInput[]
    update?: DailyStatsUpdateWithWhereUniqueWithoutUserInput | DailyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyStatsUpdateManyWithWhereWithoutUserInput | DailyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyStatsScalarWhereInput | DailyStatsScalarWhereInput[]
  }

  export type WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput> | WeeklyStatsCreateWithoutUserInput[] | WeeklyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WeeklyStatsCreateOrConnectWithoutUserInput | WeeklyStatsCreateOrConnectWithoutUserInput[]
    upsert?: WeeklyStatsUpsertWithWhereUniqueWithoutUserInput | WeeklyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WeeklyStatsCreateManyUserInputEnvelope
    set?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    disconnect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    delete?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    connect?: WeeklyStatsWhereUniqueInput | WeeklyStatsWhereUniqueInput[]
    update?: WeeklyStatsUpdateWithWhereUniqueWithoutUserInput | WeeklyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WeeklyStatsUpdateManyWithWhereWithoutUserInput | WeeklyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WeeklyStatsScalarWhereInput | WeeklyStatsScalarWhereInput[]
  }

  export type MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput> | MonthlyStatsCreateWithoutUserInput[] | MonthlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MonthlyStatsCreateOrConnectWithoutUserInput | MonthlyStatsCreateOrConnectWithoutUserInput[]
    upsert?: MonthlyStatsUpsertWithWhereUniqueWithoutUserInput | MonthlyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MonthlyStatsCreateManyUserInputEnvelope
    set?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    disconnect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    delete?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    connect?: MonthlyStatsWhereUniqueInput | MonthlyStatsWhereUniqueInput[]
    update?: MonthlyStatsUpdateWithWhereUniqueWithoutUserInput | MonthlyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MonthlyStatsUpdateManyWithWhereWithoutUserInput | MonthlyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MonthlyStatsScalarWhereInput | MonthlyStatsScalarWhereInput[]
  }

  export type YearlyStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput> | YearlyStatsCreateWithoutUserInput[] | YearlyStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: YearlyStatsCreateOrConnectWithoutUserInput | YearlyStatsCreateOrConnectWithoutUserInput[]
    upsert?: YearlyStatsUpsertWithWhereUniqueWithoutUserInput | YearlyStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: YearlyStatsCreateManyUserInputEnvelope
    set?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    disconnect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    delete?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    connect?: YearlyStatsWhereUniqueInput | YearlyStatsWhereUniqueInput[]
    update?: YearlyStatsUpdateWithWhereUniqueWithoutUserInput | YearlyStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: YearlyStatsUpdateManyWithWhereWithoutUserInput | YearlyStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: YearlyStatsScalarWhereInput | YearlyStatsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCustomTasksInput = {
    create?: XOR<UserCreateWithoutCustomTasksInput, UserUncheckedCreateWithoutCustomTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomTasksInput
    connect?: UserWhereUniqueInput
  }

  export type PriorityCreateNestedOneWithoutCustomTasksInput = {
    create?: XOR<PriorityCreateWithoutCustomTasksInput, PriorityUncheckedCreateWithoutCustomTasksInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutCustomTasksInput
    connect?: PriorityWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutCustomTasksInput = {
    create?: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput> | TagCreateWithoutCustomTasksInput[] | TagUncheckedCreateWithoutCustomTasksInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCustomTasksInput | TagCreateOrConnectWithoutCustomTasksInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutCustomTasksInput = {
    create?: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput> | TagCreateWithoutCustomTasksInput[] | TagUncheckedCreateWithoutCustomTasksInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCustomTasksInput | TagCreateOrConnectWithoutCustomTasksInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCustomTasksNestedInput = {
    create?: XOR<UserCreateWithoutCustomTasksInput, UserUncheckedCreateWithoutCustomTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomTasksInput
    upsert?: UserUpsertWithoutCustomTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomTasksInput, UserUpdateWithoutCustomTasksInput>, UserUncheckedUpdateWithoutCustomTasksInput>
  }

  export type PriorityUpdateOneWithoutCustomTasksNestedInput = {
    create?: XOR<PriorityCreateWithoutCustomTasksInput, PriorityUncheckedCreateWithoutCustomTasksInput>
    connectOrCreate?: PriorityCreateOrConnectWithoutCustomTasksInput
    upsert?: PriorityUpsertWithoutCustomTasksInput
    disconnect?: PriorityWhereInput | boolean
    delete?: PriorityWhereInput | boolean
    connect?: PriorityWhereUniqueInput
    update?: XOR<XOR<PriorityUpdateToOneWithWhereWithoutCustomTasksInput, PriorityUpdateWithoutCustomTasksInput>, PriorityUncheckedUpdateWithoutCustomTasksInput>
  }

  export type TagUpdateManyWithoutCustomTasksNestedInput = {
    create?: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput> | TagCreateWithoutCustomTasksInput[] | TagUncheckedCreateWithoutCustomTasksInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCustomTasksInput | TagCreateOrConnectWithoutCustomTasksInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutCustomTasksInput | TagUpsertWithWhereUniqueWithoutCustomTasksInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutCustomTasksInput | TagUpdateWithWhereUniqueWithoutCustomTasksInput[]
    updateMany?: TagUpdateManyWithWhereWithoutCustomTasksInput | TagUpdateManyWithWhereWithoutCustomTasksInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TagUncheckedUpdateManyWithoutCustomTasksNestedInput = {
    create?: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput> | TagCreateWithoutCustomTasksInput[] | TagUncheckedCreateWithoutCustomTasksInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCustomTasksInput | TagCreateOrConnectWithoutCustomTasksInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutCustomTasksInput | TagUpsertWithWhereUniqueWithoutCustomTasksInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutCustomTasksInput | TagUpdateWithWhereUniqueWithoutCustomTasksInput[]
    updateMany?: TagUpdateManyWithWhereWithoutCustomTasksInput | TagUpdateManyWithWhereWithoutCustomTasksInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTagsInput = {
    create?: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCustomDataCreateNestedManyWithoutTagsInput = {
    create?: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput> | TaskCustomDataCreateWithoutTagsInput[] | TaskCustomDataUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutTagsInput | TaskCustomDataCreateOrConnectWithoutTagsInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type TaskCustomDataUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput> | TaskCustomDataCreateWithoutTagsInput[] | TaskCustomDataUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutTagsInput | TaskCustomDataCreateOrConnectWithoutTagsInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagsInput
    upsert?: UserUpsertWithoutTagsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTagsInput, UserUpdateWithoutTagsInput>, UserUncheckedUpdateWithoutTagsInput>
  }

  export type TaskCustomDataUpdateManyWithoutTagsNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput> | TaskCustomDataCreateWithoutTagsInput[] | TaskCustomDataUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutTagsInput | TaskCustomDataCreateOrConnectWithoutTagsInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutTagsInput | TaskCustomDataUpsertWithWhereUniqueWithoutTagsInput[]
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutTagsInput | TaskCustomDataUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutTagsInput | TaskCustomDataUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput> | TaskCustomDataCreateWithoutTagsInput[] | TaskCustomDataUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutTagsInput | TaskCustomDataCreateOrConnectWithoutTagsInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutTagsInput | TaskCustomDataUpsertWithWhereUniqueWithoutTagsInput[]
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutTagsInput | TaskCustomDataUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutTagsInput | TaskCustomDataUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type TaskCustomDataCreateNestedManyWithoutPriorityInput = {
    create?: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput> | TaskCustomDataCreateWithoutPriorityInput[] | TaskCustomDataUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutPriorityInput | TaskCustomDataCreateOrConnectWithoutPriorityInput[]
    createMany?: TaskCustomDataCreateManyPriorityInputEnvelope
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type TaskCustomDataUncheckedCreateNestedManyWithoutPriorityInput = {
    create?: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput> | TaskCustomDataCreateWithoutPriorityInput[] | TaskCustomDataUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutPriorityInput | TaskCustomDataCreateOrConnectWithoutPriorityInput[]
    createMany?: TaskCustomDataCreateManyPriorityInputEnvelope
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskCustomDataUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput> | TaskCustomDataCreateWithoutPriorityInput[] | TaskCustomDataUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutPriorityInput | TaskCustomDataCreateOrConnectWithoutPriorityInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutPriorityInput | TaskCustomDataUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: TaskCustomDataCreateManyPriorityInputEnvelope
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutPriorityInput | TaskCustomDataUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutPriorityInput | TaskCustomDataUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutPriorityNestedInput = {
    create?: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput> | TaskCustomDataCreateWithoutPriorityInput[] | TaskCustomDataUncheckedCreateWithoutPriorityInput[]
    connectOrCreate?: TaskCustomDataCreateOrConnectWithoutPriorityInput | TaskCustomDataCreateOrConnectWithoutPriorityInput[]
    upsert?: TaskCustomDataUpsertWithWhereUniqueWithoutPriorityInput | TaskCustomDataUpsertWithWhereUniqueWithoutPriorityInput[]
    createMany?: TaskCustomDataCreateManyPriorityInputEnvelope
    set?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    disconnect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    delete?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    connect?: TaskCustomDataWhereUniqueInput | TaskCustomDataWhereUniqueInput[]
    update?: TaskCustomDataUpdateWithWhereUniqueWithoutPriorityInput | TaskCustomDataUpdateWithWhereUniqueWithoutPriorityInput[]
    updateMany?: TaskCustomDataUpdateManyWithWhereWithoutPriorityInput | TaskCustomDataUpdateManyWithWhereWithoutPriorityInput[]
    deleteMany?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDailyStatsInput = {
    create?: XOR<UserCreateWithoutDailyStatsInput, UserUncheckedCreateWithoutDailyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyStatsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDailyStatsNestedInput = {
    create?: XOR<UserCreateWithoutDailyStatsInput, UserUncheckedCreateWithoutDailyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyStatsInput
    upsert?: UserUpsertWithoutDailyStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDailyStatsInput, UserUpdateWithoutDailyStatsInput>, UserUncheckedUpdateWithoutDailyStatsInput>
  }

  export type UserCreateNestedOneWithoutWeeklyStatsInput = {
    create?: XOR<UserCreateWithoutWeeklyStatsInput, UserUncheckedCreateWithoutWeeklyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeeklyStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWeeklyStatsNestedInput = {
    create?: XOR<UserCreateWithoutWeeklyStatsInput, UserUncheckedCreateWithoutWeeklyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWeeklyStatsInput
    upsert?: UserUpsertWithoutWeeklyStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWeeklyStatsInput, UserUpdateWithoutWeeklyStatsInput>, UserUncheckedUpdateWithoutWeeklyStatsInput>
  }

  export type UserCreateNestedOneWithoutMonthlyStatsInput = {
    create?: XOR<UserCreateWithoutMonthlyStatsInput, UserUncheckedCreateWithoutMonthlyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMonthlyStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMonthlyStatsNestedInput = {
    create?: XOR<UserCreateWithoutMonthlyStatsInput, UserUncheckedCreateWithoutMonthlyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMonthlyStatsInput
    upsert?: UserUpsertWithoutMonthlyStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMonthlyStatsInput, UserUpdateWithoutMonthlyStatsInput>, UserUncheckedUpdateWithoutMonthlyStatsInput>
  }

  export type UserCreateNestedOneWithoutYearlyStatsInput = {
    create?: XOR<UserCreateWithoutYearlyStatsInput, UserUncheckedCreateWithoutYearlyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutYearlyStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutYearlyStatsNestedInput = {
    create?: XOR<UserCreateWithoutYearlyStatsInput, UserUncheckedCreateWithoutYearlyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutYearlyStatsInput
    upsert?: UserUpsertWithoutYearlyStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutYearlyStatsInput, UserUpdateWithoutYearlyStatsInput>, UserUncheckedUpdateWithoutYearlyStatsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type TaskCustomDataCreateWithoutUserInput = {
    id?: string
    googleTaskId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    priority?: PriorityCreateNestedOneWithoutCustomTasksInput
    tags?: TagCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataUncheckedCreateWithoutUserInput = {
    id?: string
    googleTaskId: string
    priorityId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataCreateOrConnectWithoutUserInput = {
    where: TaskCustomDataWhereUniqueInput
    create: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput>
  }

  export type TaskCustomDataCreateManyUserInputEnvelope = {
    data: TaskCustomDataCreateManyUserInput | TaskCustomDataCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutUserInput = {
    id?: string
    name: string
    customTasks?: TaskCustomDataCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagCreateOrConnectWithoutUserInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput>
  }

  export type TagCreateManyUserInputEnvelope = {
    data: TagCreateManyUserInput | TagCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DailyStatsCreateWithoutUserInput = {
    id?: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyStatsUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyStatsCreateOrConnectWithoutUserInput = {
    where: DailyStatsWhereUniqueInput
    create: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput>
  }

  export type DailyStatsCreateManyUserInputEnvelope = {
    data: DailyStatsCreateManyUserInput | DailyStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WeeklyStatsCreateWithoutUserInput = {
    id?: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyStatsUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyStatsCreateOrConnectWithoutUserInput = {
    where: WeeklyStatsWhereUniqueInput
    create: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput>
  }

  export type WeeklyStatsCreateManyUserInputEnvelope = {
    data: WeeklyStatsCreateManyUserInput | WeeklyStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyStatsCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyStatsUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyStatsCreateOrConnectWithoutUserInput = {
    where: MonthlyStatsWhereUniqueInput
    create: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput>
  }

  export type MonthlyStatsCreateManyUserInputEnvelope = {
    data: MonthlyStatsCreateManyUserInput | MonthlyStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type YearlyStatsCreateWithoutUserInput = {
    id?: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YearlyStatsUncheckedCreateWithoutUserInput = {
    id?: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YearlyStatsCreateOrConnectWithoutUserInput = {
    where: YearlyStatsWhereUniqueInput
    create: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput>
  }

  export type YearlyStatsCreateManyUserInputEnvelope = {
    data: YearlyStatsCreateManyUserInput | YearlyStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCustomDataUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskCustomDataWhereUniqueInput
    update: XOR<TaskCustomDataUpdateWithoutUserInput, TaskCustomDataUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCustomDataCreateWithoutUserInput, TaskCustomDataUncheckedCreateWithoutUserInput>
  }

  export type TaskCustomDataUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskCustomDataWhereUniqueInput
    data: XOR<TaskCustomDataUpdateWithoutUserInput, TaskCustomDataUncheckedUpdateWithoutUserInput>
  }

  export type TaskCustomDataUpdateManyWithWhereWithoutUserInput = {
    where: TaskCustomDataScalarWhereInput
    data: XOR<TaskCustomDataUpdateManyMutationInput, TaskCustomDataUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskCustomDataScalarWhereInput = {
    AND?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
    OR?: TaskCustomDataScalarWhereInput[]
    NOT?: TaskCustomDataScalarWhereInput | TaskCustomDataScalarWhereInput[]
    id?: StringFilter<"TaskCustomData"> | string
    googleTaskId?: StringFilter<"TaskCustomData"> | string
    userId?: StringFilter<"TaskCustomData"> | string
    priorityId?: IntNullableFilter<"TaskCustomData"> | number | null
    createdAt?: DateTimeFilter<"TaskCustomData"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCustomData"> | Date | string
  }

  export type TagUpsertWithWhereUniqueWithoutUserInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutUserInput, TagUncheckedUpdateWithoutUserInput>
    create: XOR<TagCreateWithoutUserInput, TagUncheckedCreateWithoutUserInput>
  }

  export type TagUpdateWithWhereUniqueWithoutUserInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutUserInput, TagUncheckedUpdateWithoutUserInput>
  }

  export type TagUpdateManyWithWhereWithoutUserInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutUserInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    userId?: StringFilter<"Tag"> | string
  }

  export type DailyStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: DailyStatsWhereUniqueInput
    update: XOR<DailyStatsUpdateWithoutUserInput, DailyStatsUncheckedUpdateWithoutUserInput>
    create: XOR<DailyStatsCreateWithoutUserInput, DailyStatsUncheckedCreateWithoutUserInput>
  }

  export type DailyStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: DailyStatsWhereUniqueInput
    data: XOR<DailyStatsUpdateWithoutUserInput, DailyStatsUncheckedUpdateWithoutUserInput>
  }

  export type DailyStatsUpdateManyWithWhereWithoutUserInput = {
    where: DailyStatsScalarWhereInput
    data: XOR<DailyStatsUpdateManyMutationInput, DailyStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type DailyStatsScalarWhereInput = {
    AND?: DailyStatsScalarWhereInput | DailyStatsScalarWhereInput[]
    OR?: DailyStatsScalarWhereInput[]
    NOT?: DailyStatsScalarWhereInput | DailyStatsScalarWhereInput[]
    id?: StringFilter<"DailyStats"> | string
    userId?: StringFilter<"DailyStats"> | string
    date?: DateTimeFilter<"DailyStats"> | Date | string
    completedCount?: IntFilter<"DailyStats"> | number
    createdCount?: IntFilter<"DailyStats"> | number
    completionRate?: FloatNullableFilter<"DailyStats"> | number | null
    createdAt?: DateTimeFilter<"DailyStats"> | Date | string
    updatedAt?: DateTimeFilter<"DailyStats"> | Date | string
  }

  export type WeeklyStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: WeeklyStatsWhereUniqueInput
    update: XOR<WeeklyStatsUpdateWithoutUserInput, WeeklyStatsUncheckedUpdateWithoutUserInput>
    create: XOR<WeeklyStatsCreateWithoutUserInput, WeeklyStatsUncheckedCreateWithoutUserInput>
  }

  export type WeeklyStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: WeeklyStatsWhereUniqueInput
    data: XOR<WeeklyStatsUpdateWithoutUserInput, WeeklyStatsUncheckedUpdateWithoutUserInput>
  }

  export type WeeklyStatsUpdateManyWithWhereWithoutUserInput = {
    where: WeeklyStatsScalarWhereInput
    data: XOR<WeeklyStatsUpdateManyMutationInput, WeeklyStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type WeeklyStatsScalarWhereInput = {
    AND?: WeeklyStatsScalarWhereInput | WeeklyStatsScalarWhereInput[]
    OR?: WeeklyStatsScalarWhereInput[]
    NOT?: WeeklyStatsScalarWhereInput | WeeklyStatsScalarWhereInput[]
    id?: StringFilter<"WeeklyStats"> | string
    userId?: StringFilter<"WeeklyStats"> | string
    year?: IntFilter<"WeeklyStats"> | number
    weekOfYear?: IntFilter<"WeeklyStats"> | number
    completedCount?: IntFilter<"WeeklyStats"> | number
    createdCount?: IntFilter<"WeeklyStats"> | number
    completionRate?: FloatNullableFilter<"WeeklyStats"> | number | null
    createdAt?: DateTimeFilter<"WeeklyStats"> | Date | string
    updatedAt?: DateTimeFilter<"WeeklyStats"> | Date | string
  }

  export type MonthlyStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: MonthlyStatsWhereUniqueInput
    update: XOR<MonthlyStatsUpdateWithoutUserInput, MonthlyStatsUncheckedUpdateWithoutUserInput>
    create: XOR<MonthlyStatsCreateWithoutUserInput, MonthlyStatsUncheckedCreateWithoutUserInput>
  }

  export type MonthlyStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: MonthlyStatsWhereUniqueInput
    data: XOR<MonthlyStatsUpdateWithoutUserInput, MonthlyStatsUncheckedUpdateWithoutUserInput>
  }

  export type MonthlyStatsUpdateManyWithWhereWithoutUserInput = {
    where: MonthlyStatsScalarWhereInput
    data: XOR<MonthlyStatsUpdateManyMutationInput, MonthlyStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type MonthlyStatsScalarWhereInput = {
    AND?: MonthlyStatsScalarWhereInput | MonthlyStatsScalarWhereInput[]
    OR?: MonthlyStatsScalarWhereInput[]
    NOT?: MonthlyStatsScalarWhereInput | MonthlyStatsScalarWhereInput[]
    id?: StringFilter<"MonthlyStats"> | string
    userId?: StringFilter<"MonthlyStats"> | string
    year?: IntFilter<"MonthlyStats"> | number
    month?: IntFilter<"MonthlyStats"> | number
    completedCount?: IntFilter<"MonthlyStats"> | number
    createdCount?: IntFilter<"MonthlyStats"> | number
    completionRate?: FloatNullableFilter<"MonthlyStats"> | number | null
    createdAt?: DateTimeFilter<"MonthlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyStats"> | Date | string
  }

  export type YearlyStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: YearlyStatsWhereUniqueInput
    update: XOR<YearlyStatsUpdateWithoutUserInput, YearlyStatsUncheckedUpdateWithoutUserInput>
    create: XOR<YearlyStatsCreateWithoutUserInput, YearlyStatsUncheckedCreateWithoutUserInput>
  }

  export type YearlyStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: YearlyStatsWhereUniqueInput
    data: XOR<YearlyStatsUpdateWithoutUserInput, YearlyStatsUncheckedUpdateWithoutUserInput>
  }

  export type YearlyStatsUpdateManyWithWhereWithoutUserInput = {
    where: YearlyStatsScalarWhereInput
    data: XOR<YearlyStatsUpdateManyMutationInput, YearlyStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type YearlyStatsScalarWhereInput = {
    AND?: YearlyStatsScalarWhereInput | YearlyStatsScalarWhereInput[]
    OR?: YearlyStatsScalarWhereInput[]
    NOT?: YearlyStatsScalarWhereInput | YearlyStatsScalarWhereInput[]
    id?: StringFilter<"YearlyStats"> | string
    userId?: StringFilter<"YearlyStats"> | string
    year?: IntFilter<"YearlyStats"> | number
    completedCount?: IntFilter<"YearlyStats"> | number
    createdCount?: IntFilter<"YearlyStats"> | number
    completionRate?: FloatNullableFilter<"YearlyStats"> | number | null
    createdAt?: DateTimeFilter<"YearlyStats"> | Date | string
    updatedAt?: DateTimeFilter<"YearlyStats"> | Date | string
  }

  export type UserCreateWithoutCustomTasksInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomTasksInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomTasksInput, UserUncheckedCreateWithoutCustomTasksInput>
  }

  export type PriorityCreateWithoutCustomTasksInput = {
    name: string
    level: number
  }

  export type PriorityUncheckedCreateWithoutCustomTasksInput = {
    id?: number
    name: string
    level: number
  }

  export type PriorityCreateOrConnectWithoutCustomTasksInput = {
    where: PriorityWhereUniqueInput
    create: XOR<PriorityCreateWithoutCustomTasksInput, PriorityUncheckedCreateWithoutCustomTasksInput>
  }

  export type TagCreateWithoutCustomTasksInput = {
    id?: string
    name: string
    user: UserCreateNestedOneWithoutTagsInput
  }

  export type TagUncheckedCreateWithoutCustomTasksInput = {
    id?: string
    name: string
    userId: string
  }

  export type TagCreateOrConnectWithoutCustomTasksInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput>
  }

  export type UserUpsertWithoutCustomTasksInput = {
    update: XOR<UserUpdateWithoutCustomTasksInput, UserUncheckedUpdateWithoutCustomTasksInput>
    create: XOR<UserCreateWithoutCustomTasksInput, UserUncheckedCreateWithoutCustomTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomTasksInput, UserUncheckedUpdateWithoutCustomTasksInput>
  }

  export type UserUpdateWithoutCustomTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PriorityUpsertWithoutCustomTasksInput = {
    update: XOR<PriorityUpdateWithoutCustomTasksInput, PriorityUncheckedUpdateWithoutCustomTasksInput>
    create: XOR<PriorityCreateWithoutCustomTasksInput, PriorityUncheckedCreateWithoutCustomTasksInput>
    where?: PriorityWhereInput
  }

  export type PriorityUpdateToOneWithWhereWithoutCustomTasksInput = {
    where?: PriorityWhereInput
    data: XOR<PriorityUpdateWithoutCustomTasksInput, PriorityUncheckedUpdateWithoutCustomTasksInput>
  }

  export type PriorityUpdateWithoutCustomTasksInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
  }

  export type PriorityUncheckedUpdateWithoutCustomTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
  }

  export type TagUpsertWithWhereUniqueWithoutCustomTasksInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutCustomTasksInput, TagUncheckedUpdateWithoutCustomTasksInput>
    create: XOR<TagCreateWithoutCustomTasksInput, TagUncheckedCreateWithoutCustomTasksInput>
  }

  export type TagUpdateWithWhereUniqueWithoutCustomTasksInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutCustomTasksInput, TagUncheckedUpdateWithoutCustomTasksInput>
  }

  export type TagUpdateManyWithWhereWithoutCustomTasksInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutCustomTasksInput>
  }

  export type UserCreateWithoutTagsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTagsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTagsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
  }

  export type TaskCustomDataCreateWithoutTagsInput = {
    id?: string
    googleTaskId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomTasksInput
    priority?: PriorityCreateNestedOneWithoutCustomTasksInput
  }

  export type TaskCustomDataUncheckedCreateWithoutTagsInput = {
    id?: string
    googleTaskId: string
    userId: string
    priorityId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCustomDataCreateOrConnectWithoutTagsInput = {
    where: TaskCustomDataWhereUniqueInput
    create: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput>
  }

  export type UserUpsertWithoutTagsInput = {
    update: XOR<UserUpdateWithoutTagsInput, UserUncheckedUpdateWithoutTagsInput>
    create: XOR<UserCreateWithoutTagsInput, UserUncheckedCreateWithoutTagsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTagsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTagsInput, UserUncheckedUpdateWithoutTagsInput>
  }

  export type UserUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCustomDataUpsertWithWhereUniqueWithoutTagsInput = {
    where: TaskCustomDataWhereUniqueInput
    update: XOR<TaskCustomDataUpdateWithoutTagsInput, TaskCustomDataUncheckedUpdateWithoutTagsInput>
    create: XOR<TaskCustomDataCreateWithoutTagsInput, TaskCustomDataUncheckedCreateWithoutTagsInput>
  }

  export type TaskCustomDataUpdateWithWhereUniqueWithoutTagsInput = {
    where: TaskCustomDataWhereUniqueInput
    data: XOR<TaskCustomDataUpdateWithoutTagsInput, TaskCustomDataUncheckedUpdateWithoutTagsInput>
  }

  export type TaskCustomDataUpdateManyWithWhereWithoutTagsInput = {
    where: TaskCustomDataScalarWhereInput
    data: XOR<TaskCustomDataUpdateManyMutationInput, TaskCustomDataUncheckedUpdateManyWithoutTagsInput>
  }

  export type TaskCustomDataCreateWithoutPriorityInput = {
    id?: string
    googleTaskId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCustomTasksInput
    tags?: TagCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataUncheckedCreateWithoutPriorityInput = {
    id?: string
    googleTaskId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutCustomTasksInput
  }

  export type TaskCustomDataCreateOrConnectWithoutPriorityInput = {
    where: TaskCustomDataWhereUniqueInput
    create: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput>
  }

  export type TaskCustomDataCreateManyPriorityInputEnvelope = {
    data: TaskCustomDataCreateManyPriorityInput | TaskCustomDataCreateManyPriorityInput[]
    skipDuplicates?: boolean
  }

  export type TaskCustomDataUpsertWithWhereUniqueWithoutPriorityInput = {
    where: TaskCustomDataWhereUniqueInput
    update: XOR<TaskCustomDataUpdateWithoutPriorityInput, TaskCustomDataUncheckedUpdateWithoutPriorityInput>
    create: XOR<TaskCustomDataCreateWithoutPriorityInput, TaskCustomDataUncheckedCreateWithoutPriorityInput>
  }

  export type TaskCustomDataUpdateWithWhereUniqueWithoutPriorityInput = {
    where: TaskCustomDataWhereUniqueInput
    data: XOR<TaskCustomDataUpdateWithoutPriorityInput, TaskCustomDataUncheckedUpdateWithoutPriorityInput>
  }

  export type TaskCustomDataUpdateManyWithWhereWithoutPriorityInput = {
    where: TaskCustomDataScalarWhereInput
    data: XOR<TaskCustomDataUpdateManyMutationInput, TaskCustomDataUncheckedUpdateManyWithoutPriorityInput>
  }

  export type UserCreateWithoutDailyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDailyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDailyStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDailyStatsInput, UserUncheckedCreateWithoutDailyStatsInput>
  }

  export type UserUpsertWithoutDailyStatsInput = {
    update: XOR<UserUpdateWithoutDailyStatsInput, UserUncheckedUpdateWithoutDailyStatsInput>
    create: XOR<UserCreateWithoutDailyStatsInput, UserUncheckedCreateWithoutDailyStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDailyStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDailyStatsInput, UserUncheckedUpdateWithoutDailyStatsInput>
  }

  export type UserUpdateWithoutDailyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDailyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWeeklyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWeeklyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWeeklyStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWeeklyStatsInput, UserUncheckedCreateWithoutWeeklyStatsInput>
  }

  export type UserUpsertWithoutWeeklyStatsInput = {
    update: XOR<UserUpdateWithoutWeeklyStatsInput, UserUncheckedUpdateWithoutWeeklyStatsInput>
    create: XOR<UserCreateWithoutWeeklyStatsInput, UserUncheckedCreateWithoutWeeklyStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWeeklyStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWeeklyStatsInput, UserUncheckedUpdateWithoutWeeklyStatsInput>
  }

  export type UserUpdateWithoutWeeklyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWeeklyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMonthlyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMonthlyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    yearlyStats?: YearlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMonthlyStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMonthlyStatsInput, UserUncheckedCreateWithoutMonthlyStatsInput>
  }

  export type UserUpsertWithoutMonthlyStatsInput = {
    update: XOR<UserUpdateWithoutMonthlyStatsInput, UserUncheckedUpdateWithoutMonthlyStatsInput>
    create: XOR<UserCreateWithoutMonthlyStatsInput, UserUncheckedCreateWithoutMonthlyStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMonthlyStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMonthlyStatsInput, UserUncheckedUpdateWithoutMonthlyStatsInput>
  }

  export type UserUpdateWithoutMonthlyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMonthlyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    yearlyStats?: YearlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutYearlyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataCreateNestedManyWithoutUserInput
    tags?: TagCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutYearlyStatsInput = {
    id?: string
    googleId: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    subscriptionPlan?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customTasks?: TaskCustomDataUncheckedCreateNestedManyWithoutUserInput
    tags?: TagUncheckedCreateNestedManyWithoutUserInput
    dailyStats?: DailyStatsUncheckedCreateNestedManyWithoutUserInput
    weeklyStats?: WeeklyStatsUncheckedCreateNestedManyWithoutUserInput
    monthlyStats?: MonthlyStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutYearlyStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutYearlyStatsInput, UserUncheckedCreateWithoutYearlyStatsInput>
  }

  export type UserUpsertWithoutYearlyStatsInput = {
    update: XOR<UserUpdateWithoutYearlyStatsInput, UserUncheckedUpdateWithoutYearlyStatsInput>
    create: XOR<UserCreateWithoutYearlyStatsInput, UserUncheckedCreateWithoutYearlyStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutYearlyStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutYearlyStatsInput, UserUncheckedUpdateWithoutYearlyStatsInput>
  }

  export type UserUpdateWithoutYearlyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUpdateManyWithoutUserNestedInput
    tags?: TagUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutYearlyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutUserNestedInput
    tags?: TagUncheckedUpdateManyWithoutUserNestedInput
    dailyStats?: DailyStatsUncheckedUpdateManyWithoutUserNestedInput
    weeklyStats?: WeeklyStatsUncheckedUpdateManyWithoutUserNestedInput
    monthlyStats?: MonthlyStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskCustomDataCreateManyUserInput = {
    id?: string
    googleTaskId: string
    priorityId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TagCreateManyUserInput = {
    id?: string
    name: string
  }

  export type DailyStatsCreateManyUserInput = {
    id?: string
    date: Date | string
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeeklyStatsCreateManyUserInput = {
    id?: string
    year: number
    weekOfYear: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyStatsCreateManyUserInput = {
    id?: string
    year: number
    month: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type YearlyStatsCreateManyUserInput = {
    id?: string
    year: number
    completedCount?: number
    createdCount?: number
    completionRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCustomDataUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priority?: PriorityUpdateOneWithoutCustomTasksNestedInput
    tags?: TagUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    customTasks?: TaskCustomDataUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    customTasks?: TaskCustomDataUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DailyStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeeklyStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    weekOfYear?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    month?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YearlyStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    completedCount?: IntFieldUpdateOperationsInput | number
    createdCount?: IntFieldUpdateOperationsInput | number
    completionRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutCustomTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateWithoutCustomTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutCustomTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCustomDataUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomTasksNestedInput
    priority?: PriorityUpdateOneWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    priorityId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCustomDataCreateManyPriorityInput = {
    id?: string
    googleTaskId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCustomDataUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomTasksNestedInput
    tags?: TagUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutCustomTasksNestedInput
  }

  export type TaskCustomDataUncheckedUpdateManyWithoutPriorityInput = {
    id?: StringFieldUpdateOperationsInput | string
    googleTaskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}