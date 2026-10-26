import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const getHeaders = () => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      page,
      perPage,
      search: search.trim() ? search.trim() : undefined,
    },
    headers: getHeaders(),
  });

  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, payload, {
    headers: getHeaders(),
  });

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: getHeaders(),
  });

  return response.data;
}
