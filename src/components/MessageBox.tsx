import { createApp, defineComponent } from "vue";

interface MessageBoxProps {
    msg: string;
}

const MessageBox = defineComponent({
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup(props: MessageBoxProps) {
      return () => (
        <div id="msgbox-root" class="fixed top-16 left-0 right-0 mx-auto w-fit bg-blue-500 text-white p-4 rounded shadow">
            <p>{props.msg}</p>
        </div>
    );
    }
});

function showMsg(msg: string, p0?: string, p1?: string, p2?: string, p3?: string, p4?: () => void) {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const app = createApp(MessageBox, { msg });
    setTimeout(() => {
        app.unmount();
        document.body.removeChild(div);
    }, 2000);
    app.mount(div);
}

export { showMsg };
