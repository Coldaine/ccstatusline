import * as os from 'node:os';
import {
    describe,
    expect,
    it
} from 'vitest';

import type {
    RenderContext,
    WidgetItem
} from '../../types';
import { DEFAULT_SETTINGS } from '../../types/Settings';
import { HostnameWidget } from '../Hostname';

describe('HostnameWidget', () => {
    it('should render hostname in preview mode', () => {
        const widget = new HostnameWidget();
        const context: RenderContext = { isPreview: true };
        const item: WidgetItem = {
            id: 'hostname',
            type: 'hostname'
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        expect(result).toBe(' Icarus');
    });

    it('should render actual hostname', () => {
        const widget = new HostnameWidget();
        const context: RenderContext = {};
        const item: WidgetItem = {
            id: 'hostname',
            type: 'hostname'
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        const hostname = os.hostname();
        expect(result).toBe(` ${hostname}`);
    });

    it('should render hostname with raw value mode', () => {
        const widget = new HostnameWidget();
        const context: RenderContext = {};
        const item: WidgetItem = {
            id: 'hostname',
            type: 'hostname',
            rawValue: true
        };

        const result = widget.render(item, context, DEFAULT_SETTINGS);
        const hostname = os.hostname();
        expect(result).toBe(hostname);
    });

    it('should render hostname with Nerd Font icon', () => {
        const widget = new HostnameWidget();
        const context: RenderContext = {};
        const settings = { ...DEFAULT_SETTINGS, nerdFontIcons: true };
        const item: WidgetItem = {
            id: 'hostname',
            type: 'hostname'
        };

        const result = widget.render(item, context, settings);
        const hostname = os.hostname();
        expect(result).toBe(`\uF108 ${hostname}`);
    });
});