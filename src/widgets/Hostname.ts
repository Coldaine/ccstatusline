import * as os from 'node:os';

import type { RenderContext } from '../types/RenderContext';
import type { Settings } from '../types/Settings';
import type {
    Widget,
    WidgetEditorDisplay,
    WidgetItem
} from '../types/Widget';
import { formatWidgetLabel } from '../utils/nerd-font-icons';

export class HostnameWidget implements Widget {
    getDefaultColor(): string { return 'cyan'; }
    getDescription(): string { return 'Shows the machine hostname'; }
    getDisplayName(): string { return 'Hostname'; }
    getEditorDisplay(item: WidgetItem): WidgetEditorDisplay {
        return { displayText: this.getDisplayName() };
    }

    render(item: WidgetItem, context: RenderContext, settings: Settings): string | null {
        if (context.isPreview) {
            return formatWidgetLabel('hostname', 'Icarus', ' ', item.rawValue, settings.nerdFontIcons);
        }

        const hostname = os.hostname();
        return formatWidgetLabel('hostname', hostname, ' ', item.rawValue, settings.nerdFontIcons);
    }

    supportsRawValue(): boolean { return true; }
    supportsColors(item: WidgetItem): boolean { return true; }
}