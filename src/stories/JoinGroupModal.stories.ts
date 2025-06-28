import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import JoinGroupModal from '@/components/views/group/JoinGroupModal.vue';
import Button from '@/components/ui/button/Button.vue';

const meta = {
  title: 'Components/Group/JoinGroupModal',
  component: JoinGroupModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 표시 여부',
    },
  },
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'JoinGroupModal은 그룹 참여를 위한 모달 컴포넌트입니다. 그룹 코드를 입력하여 그룹에 참여할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof JoinGroupModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 사용 예시
export const Default: Story = {
  render: args => ({
    components: { JoinGroupModal, Button },
    setup() {
      const showModal = ref(args.isOpen);

      return {
        args,
        showModal,
        toggleModal: () => {
          showModal.value = !showModal.value;
        },
        handleJoined: () => {
          console.log('Group joined!');
        },
      };
    },
    template: `
      <div>
        <Button @click="toggleModal">그룹 참여 모달 열기</Button>
        <JoinGroupModal 
          v-model:isOpen="showModal"
          @joined="handleJoined"
        />
      </div>
    `,
  }),
};
