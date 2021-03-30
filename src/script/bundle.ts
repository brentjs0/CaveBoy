import jsyaml from 'js-yaml';
import JSZip from 'jszip';

import CaveBoyConfiguration from './base/CaveBoyConfiguration';
import CaveBoyError from './base/error/CaveBoyError';

(window as any).caveBoyConfiguration = new CaveBoyConfiguration();

const fileInput: HTMLInputElement = document.getElementById('ProjectFileInput') as HTMLInputElement;

fileInput.addEventListener('change', function (event: Event) {

    const zipFile: File | null | undefined = this.files?.item(0);

    if (zipFile !== null && zipFile !== undefined) {

        JSZip.loadAsync(zipFile).then(function (jsZip: JSZip) {

            const projectFileEntry: [string, JSZip.JSZipObject] | undefined = Object.entries(jsZip.files).find(([key, _]) => key.endsWith('Project.snake'));

            if (projectFileEntry === undefined) {
                throw new CaveBoyError('A Project.snake file could not be found in the provided ZIP.');
            }

            const [projectFilePath, projectFileJSZipObject]: [string, JSZip.JSZipObject] = projectFileEntry;

            projectFileJSZipObject.async('string').then(function (value: string) {

                console.log(`Found Project.snake file at '${projectFilePath}':`);
                let project: string | number | object | null | undefined = jsyaml.load(value);

                //document.title = `${project.Title} - CaveBoy`;
                
            });

            return jsZip;
        });

    }
   
});