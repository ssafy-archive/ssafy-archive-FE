import { GROUP } from '@/services/api/endpoint';
import api from '@/services/api/api';
import type { GroupListResponse } from '@/services/api/domains/group/types';
import type { ApiResponse } from '../../types';

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwidXNlcklkIjoyLCJsb2dpbklkIjoidGVzdCIsIm5hbWUiOiJ0ZXN0bmFtZSIsInNzYWZ5TnVtYmVyIjoiMTIzNDU2NyIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3NTA4Mjg2NjMsImV4cCI6MTc1MDg2NDY2M30.tsvkg0JlKaA6FIwmJnhiIwEHxcZzqd_z0jCUTJdQdgo';

export const getMyGroups = async (): Promise<GroupListResponse> => {
  const response = await api.get<ApiResponse<GroupListResponse>>(GROUP.GET_MY_GROUPS, {
    headers: {
      Authorization: token,
    },
  });
  return response.data.body;
};

export const createGroup = async (groupName: string): Promise<void> => {
  await api.post(
    GROUP.GROUP,
    { groupName },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
