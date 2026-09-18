export type DuesCheckoutState = {
  status: "idle" | "error";
  message?: string;
};

export const initialDuesCheckoutState: DuesCheckoutState = {
  status: "idle",
};

export type DuesReceiptState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export const initialDuesReceiptState: DuesReceiptState = {
  status: "idle",
};
