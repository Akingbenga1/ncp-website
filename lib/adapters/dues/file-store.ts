import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DuesRecord } from "@/lib/domain/dues";

const DATA_DIR = path.join(process.cwd(), ".data", "community-dues");
const RECORDS_PATH = path.join(DATA_DIR, "records.json");
const RECEIPTS_DIR = path.join(DATA_DIR, "receipts");

type RecordsFile = {
  byMemberId: Record<string, DuesRecord>;
};

async function ensureDirs(): Promise<void> {
  await mkdir(RECEIPTS_DIR, { recursive: true });
}

async function readAll(): Promise<RecordsFile> {
  await ensureDirs();
  try {
    const raw = await readFile(RECORDS_PATH, "utf8");
    const parsed = JSON.parse(raw) as RecordsFile;
    if (!parsed || typeof parsed.byMemberId !== "object") {
      return { byMemberId: {} };
    }
    return parsed;
  } catch {
    return { byMemberId: {} };
  }
}

async function writeAll(data: RecordsFile): Promise<void> {
  await ensureDirs();
  await writeFile(RECORDS_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function loadDuesRecord(
  memberId: string,
): Promise<DuesRecord | null> {
  const all = await readAll();
  return all.byMemberId[memberId] ?? null;
}

export async function saveDuesRecord(record: DuesRecord): Promise<void> {
  const all = await readAll();
  all.byMemberId[record.memberId] = record;
  await writeAll(all);
}

export async function storeReceiptFile(input: {
  memberId: string;
  fileName: string;
  bytes: Uint8Array;
}): Promise<string> {
  await ensureDirs();
  const safeBase = input.fileName
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(0, 80);
  const storedName = `${input.memberId}-${Date.now()}-${safeBase}`;
  const fullPath = path.join(RECEIPTS_DIR, storedName);
  await writeFile(fullPath, input.bytes);
  return storedName;
}
