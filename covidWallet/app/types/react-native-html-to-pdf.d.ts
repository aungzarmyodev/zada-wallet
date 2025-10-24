declare module 'react-native-html-to-pdf' {
  interface RNHTMLtoPDFOptions {
    html: string;
    fileName: string;
    directory?: string;
    padding?: number;
    height?: number;
    width?: number;
  }

  interface RNHTMLtoPDFResult {
    filePath: string;
  }

  const RNHTMLtoPDF: {
    convert: (options: RNHTMLtoPDFOptions) => Promise<RNHTMLtoPDFResult>;
  };

  export default RNHTMLtoPDF;
}
