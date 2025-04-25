if (!process.env['SYSTEM_DEFINITIONID']) {
    console.error('='.repeat(80));
    console.error('npm publish må ikke køres manuelt');
    console.error('='.repeat(80));
    process.exit(1);
}
