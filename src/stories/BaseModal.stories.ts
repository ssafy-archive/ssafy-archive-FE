import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import Button from '@/components/ui/button/Button.vue';

const meta = {
  title: 'Components/Modal/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: '모달의 표시 여부',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: '모달의 크기',
    },
    persistent: {
      control: 'boolean',
      description: '외부 클릭 시 모달이 닫히지 않도록 설정',
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
  },
  args: {
    modelValue: false,
    size: 'md',
    persistent: false,
    showCloseButton: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'BaseModal은 shadcn의 Dialog 컴포넌트를 기반으로 한 재사용 가능한 모달 컴포넌트입니다. 헤더, 본문, 푸터 영역에 대한 슬롯을 제공합니다.',
      },
    },
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 사용 예시
export const Default: Story = {
  render: args => ({
    components: { BaseModal, Button },
    setup() {
      const showModal = ref(args.modelValue);

      return {
        args,
        showModal,
        toggleModal: () => {
          showModal.value = !showModal.value;
        },
      };
    },
    template: `
      <div>
        <Button @click="toggleModal">모달 열기</Button>
        <BaseModal 
          v-model="showModal"
          :size="args.size"
          :persistent="args.persistent"
          :showCloseButton="args.showCloseButton"
          @close="args.close"
        >
          <div class="py-2">
            <p>기본 모달 내용입니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

// 헤더와 푸터가 있는 모달
export const WithHeaderAndFooter: Story = {
  render: args => ({
    components: { BaseModal, Button },
    setup() {
      const showModal = ref(false);

      return {
        args,
        showModal,
        toggleModal: () => {
          showModal.value = !showModal.value;
        },
      };
    },
    template: `
      <div>
        <Button @click="toggleModal">헤더와 푸터가 있는 모달 열기</Button>
        <BaseModal 
          v-model="showModal"
          :size="args.size"
          :persistent="args.persistent"
          :showCloseButton="args.showCloseButton"
        >
          <template #header>
            <h2 class="text-lg font-semibold leading-none tracking-tight">모달 제목</h2>
            <p class="text-sm text-muted-foreground">이 모달에 대한 추가 설명입니다.</p>
          </template>
          
          <div class="py-4">
            <p>이 모달은 헤더와 푸터 영역을 가지고 있습니다.</p>
            <p class="mt-2">내용은 이렇게 중간에 표시됩니다.</p>
          </div>
          
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="outline" @click="showModal = false">취소</Button>
              <Button @click="showModal = false">확인</Button>
            </div>
          </template>
        </BaseModal>
      </div>
    `,
  }),
};

// 다양한 크기의 모달
export const DifferentSizes: Story = {
  render: () => ({
    components: { BaseModal, Button },
    setup() {
      const showModalSm = ref(false);
      const showModalMd = ref(false);
      const showModalLg = ref(false);
      const showModalXl = ref(false);
      const showModal2xl = ref(false);

      return {
        showModalSm,
        showModalMd,
        showModalLg,
        showModalXl,
        showModal2xl,
      };
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Button @click="showModalSm = true">작은 모달</Button>
        <Button @click="showModalMd = true">중간 모달</Button>
        <Button @click="showModalLg = true">큰 모달</Button>
        <Button @click="showModalXl = true">더 큰 모달</Button>
        <Button @click="showModal2xl = true">가장 큰 모달</Button>
        
        <BaseModal v-model="showModalSm" size="sm">
          <template #header>
            <h2 class="text-lg font-semibold">작은 모달 (sm)</h2>
          </template>
          <div class="py-4">
            <p>작은 크기의 모달입니다.</p>
          </div>
        </BaseModal>
        
        <BaseModal v-model="showModalMd" size="md">
          <template #header>
            <h2 class="text-lg font-semibold">중간 모달 (md)</h2>
          </template>
          <div class="py-4">
            <p>중간 크기의 모달입니다.</p>
          </div>
        </BaseModal>
        
        <BaseModal v-model="showModalLg" size="lg">
          <template #header>
            <h2 class="text-lg font-semibold">큰 모달 (lg)</h2>
          </template>
          <div class="py-4">
            <p>큰 크기의 모달입니다.</p>
          </div>
        </BaseModal>
        
        <BaseModal v-model="showModalXl" size="xl">
          <template #header>
            <h2 class="text-lg font-semibold">더 큰 모달 (xl)</h2>
          </template>
          <div class="py-4">
            <p>더 큰 크기의 모달입니다.</p>
          </div>
        </BaseModal>
        
        <BaseModal v-model="showModal2xl" size="2xl">
          <template #header>
            <h2 class="text-lg font-semibold">가장 큰 모달 (2xl)</h2>
          </template>
          <div class="py-4">
            <p>가장 큰 크기의 모달입니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

// 닫기 버튼 없는 모달
export const WithoutCloseButton: Story = {
  args: {
    showCloseButton: false,
  },
  render: () => ({
    components: { BaseModal, Button },
    setup() {
      const showModal = ref(false);

      return {
        showModal,
      };
    },
    template: `
      <div>
        <Button @click="showModal = true">닫기 버튼 없는 모달</Button>
        <BaseModal 
          v-model="showModal"
          :showCloseButton="false"
        >
          <template #header>
            <h2 class="text-lg font-semibold">닫기 버튼 없는 모달</h2>
          </template>
          <div class="py-4">
            <p>이 모달은 오른쪽 상단에 닫기 버튼이 없습니다.</p>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <Button @click="showModal = false">확인으로 닫기</Button>
            </div>
          </template>
        </BaseModal>
      </div>
    `,
  }),
};

// 배경 클릭으로 닫히지 않는 모달
export const PersistentModal: Story = {
  args: {
    persistent: true,
  },
  render: () => ({
    components: { BaseModal, Button },
    setup() {
      const showModal = ref(false);

      return {
        showModal,
      };
    },
    template: `
      <div>
        <Button @click="showModal = true">배경 클릭으로 닫히지 않는 모달</Button>
        <BaseModal 
          v-model="showModal"
          :persistent="true"
        >
          <template #header>
            <h2 class="text-lg font-semibold">Persistent 모달</h2>
          </template>
          <div class="py-4">
            <p>이 모달은 배경을 클릭해도 닫히지 않습니다.</p>
            <p class="mt-2">반드시 닫기 버튼이나 확인 버튼을 통해서만 닫을 수 있습니다.</p>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <Button @click="showModal = false">확인</Button>
            </div>
          </template>
        </BaseModal>
      </div>
    `,
  }),
};

// 폼이 있는 모달 예시
export const FormModal: Story = {
  render: () => ({
    components: { BaseModal, Button },
    setup() {
      const showModal = ref(false);
      const form = ref({
        name: '',
        email: '',
      });

      const submitForm = () => {
        alert(`제출된 데이터: ${JSON.stringify(form.value)}`);
        showModal.value = false;
      };

      return {
        showModal,
        form,
        submitForm,
      };
    },
    template: `
      <div>
        <Button @click="showModal = true">폼 모달 열기</Button>
        <BaseModal 
          v-model="showModal"
          size="lg"
        >
          <template #header>
            <h2 class="text-lg font-semibold">사용자 정보 입력</h2>
            <p class="text-sm text-muted-foreground">아래 양식을 작성해주세요.</p>
          </template>
          
          <form @submit.prevent="submitForm" class="py-4 space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="name">이름</label>
              <input 
                id="name"
                v-model="form.name" 
                type="text" 
                class="w-full px-3 py-2 border rounded-md"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" for="email">이메일</label>
              <input 
                id="email"
                v-model="form.email" 
                type="email" 
                class="w-full px-3 py-2 border rounded-md"
                placeholder="이메일을 입력하세요"
              />
            </div>
          </form>
          
          <template #footer>
            <div class="flex justify-end gap-2">
              <Button variant="outline" @click="showModal = false">취소</Button>
              <Button @click="submitForm">제출</Button>
            </div>
          </template>
        </BaseModal>
      </div>
    `,
  }),
};
