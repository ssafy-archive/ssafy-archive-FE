import type { Meta, StoryObj } from '@storybook/vue3';
import FooterBar from '../components/footer/FooterBar.vue';

// 메타데이터 정의 (컴포넌트 설명, 태그 등)
const meta = {
  title: '컴포넌트/푸터/FooterBar',
  component: FooterBar,
  tags: ['autodocs'],
  argTypes: {
    // 필요한 경우 props나 이벤트를 여기에 정의
  },
  parameters: {
    layout: 'fullscreen',
    // 모바일 화면을 우선으로 보여주기 위한 설정
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
} satisfies Meta<typeof FooterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const 기본: Story = {
  args: {},
  decorators: [
    () => ({
      template: '<div style="padding-bottom: 80px;"><story /></div>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '모바일 환경에서 사용되는 기본 푸터바 컴포넌트입니다. 자유게시판, 정보 공유, 갤러리, 마이페이지로 빠르게 이동할 수 있는 네비게이션을 제공합니다.',
      },
    },
  },
};

// 활성화된 메뉴가 있는 상태 (예시로 첫 번째 메뉴가 활성화된 상태)
export const 메뉴활성화: Story = {
  args: {},
  decorators: [
    () => ({
      template: `
        <div style="padding-bottom: 80px;">
          <story />
          <div class="fixed bottom-20 left-0 right-0 text-center text-sm">
            <div class="bg-primary text-white mx-auto w-fit px-4 py-2 rounded-full">
              이 스토리는 메뉴가 활성화된 상태를 표현합니다. 실제 구현은 라우터 연동이 필요합니다.
            </div>
          </div>
        </div>
      `,
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '특정 메뉴가 활성화된 상태의 푸터바입니다. 실제 구현에서는 현재 라우트에 따라 해당 메뉴가 활성화됩니다.',
      },
    },
  },
};

// 다크 모드 스토리
export const 다크모드: Story = {
  args: {},
  decorators: [
    () => ({
      template: '<div style="padding-bottom: 80px;"><story /></div>',
    }),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          '다크 모드 환경에서의 푸터바 컴포넌트입니다. 테마에 따라 색상이 자동으로 조정됩니다.',
      },
    },
  },
};

// 반응형 디자인 스토리
export const 태블릿뷰: Story = {
  args: {},
  decorators: [
    () => ({
      template: '<div style="padding-bottom: 100px;"><story /></div>',
    }),
  ],
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    docs: {
      description: {
        story:
          '태블릿 환경에서의 푸터바 컴포넌트입니다. 모바일보다 더 큰 아이콘과 텍스트를 제공합니다.',
      },
    },
  },
};
