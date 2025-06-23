import type { Meta, StoryObj } from '@storybook/vue3';
import FooterBar from './FooterBar.vue';

// Meta information for the component
const meta: Meta<typeof FooterBar> = {
  title: 'Components/Navigation/Footer',
  component: FooterBar,
  tags: ['autodocs'],
  parameters: {
    // Optional parameters
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
        smallMobile: {
          name: 'Small Mobile',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
  // Decorators can be used to wrap the component
  decorators: [
    story => ({
      components: { story },
      template: '<div style="height: 100vh; position: relative;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof FooterBar>;

// Default state of the Footer
export const Default: Story = {};

// Example of the Footer with highlighted item
export const HighlightedItem: Story = {
  decorators: [
    () => ({
      components: { FooterBar },
      template: `
        <div style="height: 100vh; position: relative;">
          <Footer />
          <style>
            .nav-item:nth-child(1) {
              color: #007bff;
            }
            .nav-item:nth-child(1) .icon-wrapper {
              background-color: #e6f2ff;
            }
          </style>
        </div>
      `,
    }),
  ],
};

// Example showing the Footer at the bottom of a scrollable content
export const WithScrollableContent: Story = {
  decorators: [
    () => ({
      components: { FooterBar },
      template: `
        <div style="height: 100vh; overflow-y: auto;">
          <div style="height: 150vh; padding: 20px; background: linear-gradient(to bottom, #f5f5f5, #e0e0e0);">
            <h1>Scrollable Content</h1>
            <p>Scroll down to see the footer fixed at the bottom.</p>
            <div style="margin-top: 50vh;">
              <p>Keep scrolling...</p>
            </div>
          </div>
          <Footer />
        </div>
      `,
    }),
  ],
};

// Example showing the Footer with custom theme colors
export const CustomTheme: Story = {
  decorators: [
    () => ({
      components: { FooterBar },
      template: `
        <div style="height: 100vh; position: relative;">
          <Footer />
          <style>
            .footer {
              background-color: #1e293b;
            }
            .nav-text {
              color: #f8fafc;
            }
            .icon-wrapper {
              background-color: #334155;
              color: #f8fafc;
            }
          </style>
        </div>
      `,
    }),
  ],
};
