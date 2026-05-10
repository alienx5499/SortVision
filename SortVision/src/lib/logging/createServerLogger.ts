/**
 * Structured server logs: one JSON object per line, stable keys for ingestion.
 * Uses LOG_LEVEL (debug|info|warn|error); defaults to debug in development, info in production.
 */

// knip-disable-next-line -- types are used internally for documentation and type safety
export type ServerLogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_RANK: Record<ServerLogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function envLogLevel(): ServerLogLevel {
  const raw = process.env.LOG_LEVEL?.toLowerCase();
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') {
    return raw;
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

const activeMinRank = LEVEL_RANK[envLogLevel()];

function shouldEmit(level: ServerLogLevel): boolean {
  return LEVEL_RANK[level] >= activeMinRank;
}

// knip-disable-next-line -- type is used internally for field documentation
export type ServerLogFields = Record<string, unknown>;

function serializeError(err: unknown): ServerLogFields | undefined {
  if (err === undefined || err === null) return undefined;
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && err.stack
        ? { stack: err.stack }
        : {}),
    };
  }
  if (
    typeof err === 'object' &&
    'message' in err &&
    typeof (err as { message: unknown }).message === 'string'
  ) {
    return { message: (err as { message: string }).message };
  }
  try {
    return { message: JSON.stringify(err) };
  } catch {
    return { message: String(err) };
  }
}

function writeLine(level: ServerLogLevel, payload: ServerLogFields): void {
  const record = {
    level,
    time: new Date().toISOString(),
    ...payload,
  };
  const line = JSON.stringify(record);
  switch (level) {
    case 'error':
      console.error(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    default:
      console.log(line);
  }
}

export type ServerLogger = {
  debug: (msg: string, fields?: ServerLogFields) => void;
  info: (msg: string, fields?: ServerLogFields) => void;
  warn: (msg: string, fields?: ServerLogFields) => void;
  error: (msg: string, err?: unknown, fields?: ServerLogFields) => void;
};

export function createServerLogger(params: {
  requestId: string;
  scope: string;
}): ServerLogger {
  const base: ServerLogFields = {
    requestId: params.requestId,
    scope: params.scope,
  };

  return {
    debug(msg, fields) {
      if (!shouldEmit('debug')) return;
      writeLine('debug', { ...base, msg, ...fields });
    },
    info(msg, fields) {
      if (!shouldEmit('info')) return;
      writeLine('info', { ...base, msg, ...fields });
    },
    warn(msg, fields) {
      if (!shouldEmit('warn')) return;
      writeLine('warn', { ...base, msg, ...fields });
    },
    error(msg, err, fields) {
      if (!shouldEmit('error')) return;
      const serialized = serializeError(err);
      writeLine('error', {
        ...base,
        msg,
        ...(serialized ? { err: serialized } : {}),
        ...fields,
      });
    },
  };
}
