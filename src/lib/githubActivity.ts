export type GitHubAccountKey = "personal" | "academic";
export type GitHubActivityAccountSource =
  | "github-graphql"
  | "verified-snapshot-fallback"
  | "checked-in-baseline";
export type GitHubActivitySource =
  | "github-graphql"
  | "github-graphql-with-verified-account-fallback"
  | "checked-in-baseline";

export interface GitHubActivityAccount {
  key: GitHubAccountKey;
  label: "Personal" | "Academic";
  login: string;
  url: `https://github.com/${string}`;
  totalContributions: number;
  source: GitHubActivityAccountSource;
  verifiedAt: string;
}

export interface GitHubActivityDay {
  date: string;
  personalCount: number;
  personalLevel: number;
  academicCount: number;
  academicLevel: number;
  total: number;
}

export interface GitHubActivityData {
  schemaVersion: 2;
  refreshedAt: string;
  source: GitHubActivitySource;
  range: {
    from: string;
    to: string;
  };
  accounts: GitHubActivityAccount[];
  totalContributions: number;
  days: GitHubActivityDay[];
}

export const activityPalettes = {
  personal: ["#e2e8f0", "#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"],
  academic: ["#e2e8f0", "#dcfce7", "#86efac", "#22c55e", "#15803d"],
} as const;

const accountKeys = new Set<GitHubAccountKey>(["personal", "academic"]);
const accountSources = new Set<GitHubActivityAccountSource>([
  "github-graphql",
  "verified-snapshot-fallback",
  "checked-in-baseline",
]);
const activitySources = new Set<GitHubActivitySource>([
  "github-graphql",
  "github-graphql-with-verified-account-fallback",
  "checked-in-baseline",
]);
const accountContract: Record<
  GitHubAccountKey,
  Pick<GitHubActivityAccount, "label" | "login" | "url">
> = {
  personal: {
    label: "Personal",
    login: "basechildren",
    url: "https://github.com/basechildren",
  },
  academic: {
    label: "Academic",
    login: "PatVraj",
    url: "https://github.com/PatVraj",
  },
};

const isIntegerAtLeastZero = (value: unknown): value is number =>
  Number.isInteger(value) && Number(value) >= 0;

const isLevel = (value: unknown): value is number =>
  Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 4;

const isDateOnly = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(value);
};

const isIsoTimestamp = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const date = new Date(value);
  return !Number.isNaN(date.valueOf()) && date.toISOString() === value;
};

const followsDay = (previous: string, next: string) => {
  const expected = new Date(`${previous}T00:00:00.000Z`);
  expected.setUTCDate(expected.getUTCDate() + 1);
  return expected.toISOString().slice(0, 10) === next;
};

export function isGitHubActivityData(value: unknown): value is GitHubActivityData {
  if (!value || typeof value !== "object") return false;

  const data = value as Partial<GitHubActivityData>;
  if (
    data.schemaVersion !== 2 ||
    !isIsoTimestamp(data.refreshedAt) ||
    !activitySources.has(data.source as GitHubActivitySource) ||
    !data.range ||
    !isDateOnly(data.range.from) ||
    !isDateOnly(data.range.to) ||
    !Array.isArray(data.accounts) ||
    data.accounts.length !== 2 ||
    !isIntegerAtLeastZero(data.totalContributions) ||
    !Array.isArray(data.days) ||
    data.days.length < 350 ||
    data.days.length > 371
  ) {
    return false;
  }

  const accounts = data.accounts;
  const days = data.days;
  if (!accounts || !days) return false;

  const validAccounts = accounts.every(
    (account) => {
      if (!account || !accountKeys.has(account.key)) return false;

      const expected = accountContract[account.key];
      return (
        account.label === expected.label &&
        account.login === expected.login &&
        account.url === expected.url &&
        isIntegerAtLeastZero(account.totalContributions) &&
        accountSources.has(account.source) &&
        isIsoTimestamp(account.verifiedAt)
      );
    },
  );
  if (!validAccounts || new Set(accounts.map(({ key }) => key)).size !== 2) {
    return false;
  }

  const validDays = days.every(
    (day) =>
      day &&
      isDateOnly(day.date) &&
      isIntegerAtLeastZero(day.personalCount) &&
      isLevel(day.personalLevel) &&
      isIntegerAtLeastZero(day.academicCount) &&
      isLevel(day.academicLevel) &&
      isIntegerAtLeastZero(day.total) &&
      day.total === day.personalCount + day.academicCount,
  );
  if (!validDays) return false;

  if (
    data.range.from !== days[0]?.date ||
    data.range.to !== days.at(-1)?.date ||
    !days.slice(1).every((day, index) => followsDay(days[index].date, day.date))
  ) {
    return false;
  }

  const personalTotal = days.reduce(
    (total, day) => total + day.personalCount,
    0,
  );
  const academicTotal = days.reduce(
    (total, day) => total + day.academicCount,
    0,
  );
  const accountsByKey = new Map(accounts.map((account) => [account.key, account]));

  return (
    accountsByKey.get("personal")?.totalContributions === personalTotal &&
    accountsByKey.get("academic")?.totalContributions === academicTotal &&
    data.totalContributions === personalTotal + academicTotal
  );
}

export function accountFor(
  data: GitHubActivityData,
  key: GitHubAccountKey,
): GitHubActivityAccount {
  const account = data.accounts.find((candidate) => candidate.key === key);
  if (!account) throw new Error(`Missing ${key} GitHub account`);
  return account;
}

export function activitySource(day: GitHubActivityDay) {
  if (day.personalCount > 0 && day.academicCount > 0) return "both";
  if (day.personalCount > 0) return "personal";
  if (day.academicCount > 0) return "academic";
  return "none";
}

export function activityColors(day: GitHubActivityDay) {
  return {
    personal: activityPalettes.personal[day.personalLevel],
    academic: activityPalettes.academic[day.academicLevel],
  };
}

export function activityLabel(day: GitHubActivityDay) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${day.date}T00:00:00Z`));
  const totalLabel = `${day.total} contribution${day.total === 1 ? "" : "s"}`;
  return `${date}: ${totalLabel} — ${day.personalCount} personal, ${day.academicCount} academic`;
}

export function monthMarkers(days: GitHubActivityDay[]) {
  const markers: Array<{ label: string; week: number }> = [];
  let previousMonth = "";

  days.forEach((day, index) => {
    const month = day.date.slice(0, 7);
    if (month === previousMonth) return;
    previousMonth = month;

    const week = Math.floor(index / 7) + 1;
    const previous = markers.at(-1);
    const marker = {
      label: new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "UTC",
      }).format(new Date(`${day.date}T00:00:00Z`)),
      week,
    };

    if (previous && week - previous.week < 3) {
      markers[markers.length - 1] = marker;
      return;
    }

    markers.push(marker);
  });

  return markers;
}

export function formattedRefreshTime(generatedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(generatedAt));
}
