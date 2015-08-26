# -*- coding: utf-8 -*-
from os import listdir, system
from os.path import isfile, join, splitext

changeExts = [".zip", ".rar"];


class FileNames:
	originalName = "";
	newName = "";

	def __init__(self, _origianlName, _newName):
		self.originalName = _origianlName;
		self.newName = _newName;



onlyFiles = [ f for f in listdir('.') if isfile(join('.',f)) ];


fileNameList = [];

for foundFile in onlyFiles:
	fileName = splitext(foundFile)[0];
	fileExt = splitext(foundFile)[1].lower();

	if fileExt in changeExts:
		try:

			unEscaped = fileName.decode("string_escape");
			jisName = unEscaped.decode("shift-jis");
			jisName = jisName.encode("utf-8");

			fileNameList.append( FileNames( fileName + fileExt, jisName + fileExt) );
		except:
			pass


for jisFile in fileNameList:
	print jisFile.originalName, ' -> ', jisFile.newName;
	yn = raw_input('Do you want change file name? (y/n):');
	if yn.lower() == 'y':
		system( "mv \"%s\" \"%s\"" % (jisFile.originalName, jisFile.newName) );

print "finish!";
	