import { vi } from "vitest";
import { storageDefaults } from "../utils/storageDefaults";

// Mock Chrome APIs for testing
const mockChrome = {
  storage: {
    sync: {
      get: vi.fn(
        (
          keys: Record<string, unknown>,
          callback: (items: Record<string, unknown>) => void
        ) => {
          // Merge defaults with any overrides
          callback({ ...storageDefaults, ...keys, ptnKey: "test-key" });
        }
      ),
      set: vi.fn((items: Record<string, unknown>, callback?: () => void) => {
        if (callback) callback();
      }),
    },
  },
  tabs: {
    query: vi.fn(() => Promise.resolve([])),
  },
  bookmarks: {
    getTree: vi.fn(() => Promise.resolve([])),
    getChildren: vi.fn(() => Promise.resolve([])),
  },
};

vi.stubGlobal("chrome", mockChrome);
