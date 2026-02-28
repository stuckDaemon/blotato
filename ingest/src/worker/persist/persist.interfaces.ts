export interface PostMessage {
  sequenceId: number;
  userId: string;
  platform: string;
  content: string;
  desiredTime: string; // ISO string
}
